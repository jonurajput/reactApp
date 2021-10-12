import React,{useState,useEffect} from "react"
import SendIcon from '@material-ui/icons/Send';
import {SpinnerCircularSplit} from "spinners-react"
import { toast, ToastContainer } from "react-toastify"
import {useParams} from "react-router-dom"

const UpdateProduct=()=>{
    const token = sessionStorage.getItem("token")
    const params=useParams();
    const id=params.id;
    const [place,setPlace]=useState();
    const [time,setTime]=useState();
    
    const [media,setMedia]=useState();
    const [show,setShow]=useState(false);
    const [imgsrc,setImgsrc]=useState()
    const submit=async ()=>{
        setShow(true)
        if(imgsrc){
            const res1=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                   place,time,mediaUrl:imgsrc
                })
            });
            const data2=await res1.json();
            
            if(data2.err){
                setShow(false);
                toast.success(data2.err)
                return
            }
                setShow(false);
                toast.success(data2.msg)    
     }

         const mediaUrl=await uploadimage();
           if(mediaUrl){
            const res2=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    place,time,mediaUrl
                })
            });
            const dd=await res2.json()
            if(dd.err){
                setShow(false);
                toast.error(dd.err)
                return
            }
            setShow(false);
            toast.success(dd.msg)
           
           }
          
    }
    const uploadimage=async ()=>{
           const formdata=new FormData();
           formdata.append('file',media);
           formdata.append('upload_preset',"myStore")
           formdata.append('cloud_name',"jonujonu12")
          const res= await fetch("https://api.cloudinary.com/v1_1/jonujonu12/image/upload",{
               method:"POST",
               body:formdata
           })
           const res2=await res.json();
           return res2.url
    }

    useEffect(() => {
        console.log(id);
        fetch(`/admin/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:token
            },
            credentials:"include"
        }).then(res=>res.json())
        .then(data1=>{
            console.log(data1)
            setPlace(data1.data.place)
            setTime(data1.data.time)
            setImgsrc(data1.data.mediaUrl)
        })
    }, [])
   return(
       <>
        <div  className="create">
        <h3 style={{ width: "100%", textAlign:"center" }}>Update Product</h3>
        <input type="text" placeholder="Add Place" value={place} onChange={e=>setPlace(e.target.value)} />
        <input type="text" placeholder="Add time and Date" value={time} onChange={e=>setTime(e.target.value)} />
        <div style={{ width: "100%", display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center",marginBottom:"10px" }}>
            <input type="file" id="image" className="upload" 
            onChange={(e)=>{
                setMedia(e.target.files[0])
                setImgsrc("")}} />
            <img src={media?URL.createObjectURL(media):imgsrc} alt="" style={{height:"70px",width:"70px"}}/>
        </div>
        <button onClick={submit}><span>Update</span> <SendIcon /></button>
        <SpinnerCircularSplit enabled={show} color="blue"/>
        <ToastContainer/>
    </div>

       </>
                
    )
}

export default UpdateProduct;
