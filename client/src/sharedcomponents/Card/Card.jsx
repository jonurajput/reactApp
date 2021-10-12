import styles from "./Card.module.css"
import React,{useState,useEffect} from "react"
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom";

const Card=({prop})=>{
    const history=useHistory();
   const [likes,setLikes]=useState(prop.likes.length) 
   const [msg,setMsg]=useState()
   const token = sessionStorage.getItem("token")
    const like=async ()=>{
        const res= await fetch("/likes",{
             method:"POST",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":token
             },
             body:JSON.stringify({id:prop._id})
         });
         const res2=await res.json();
         setMsg(res2.msg)
         if(res2.msg==="liked"){
             setLikes(res2.likes)
         }else{
             setLikes(res2.likes)
         }
    }

    useEffect(()=>{
        const check=async ()=>{
            const res= await fetch("/check",{
                 method:"POST",
                 headers:{
                     "Content-Type":"application/json",
                     "Authorization":token
                 },
                 body:JSON.stringify({id:prop._id})
             });
             const res2=await res.json();
             setMsg(res2.msg)
        } 
        check();
    },[0])
    return(
        <>
            
            <div className={styles.card} >
        <div className={styles.image}>
            <img src={prop.mediaUrl} alt=""/>
        </div>
        <div className={styles.content}>
               <span style={{fontWeight:"700",width:"100%",textAlign:"start"}}>{prop.place} </span>
               <span style={{color:"grey",fontSize:"12px",width:"100%",textAlign:"start"}}>{prop.time}</span>
            </div>
            <span className={styles.icon}><FavoriteIcon className={msg==="liked"?styles.color:""} onClick={token?like:()=>history.push("login")}/>
               <span style={{fontSize:"11px",fontWeight:"700"}}>{likes} likes</span>
            </span>
    </div>
            
        </>
     
    )
}

export default Card;