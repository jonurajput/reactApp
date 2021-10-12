const express=require("express")
const router=express.Router();
const productSchema=require("../Models/ProductModel")
const authorization=require("../Middleware/auth")
//get all product
router.get("/api/allProduct",async (req,res)=>{
  const page=parseInt(req.query.page)
  const limit1=parseInt(req.query.limit)
  console.log(typeof page,typeof limit1);
     try{
      const data=await productSchema.find().skip((page-1)*limit1).limit(limit1)
      if(data){
        res.status(200).json({data})
      }
      res.status(200).json({msg:"hello"})
     }catch(err){
        console.log(err)
     }
    
})




//insert new product
router.post("/api/insert",authorization,async (req,res)=>{
  try{
    console.log(req.body)
    const user=req.userid
    const {place,time,mediaUrl}=req.body
    if(!place || !time || !mediaUrl){
      return res.status(400).json({err:"please filled all details"})
    }
    const newProduct=await new productSchema({
     place,time,mediaUrl,user
    }).save();
  
    if(newProduct){
      return res.status(200).json({msg:"product added successfully"})
    }
  }catch(err){
    console.log(err);
  }
  
})

//likes product
router.post("/likes",authorization,async (req,res)=>{
  try{
const user=req.userid;
const productid=req.body.id;
   const result=await productSchema.findById({_id:productid});
   if(result){
     const detail=result.likes.find(item=>item.users===user.toString())
     console.log(detail,productid,result.likes);
     if(detail){
       await productSchema.findOneAndUpdate({_id:productid},{$pull:{
         likes:{users:user.toString()}
        }});
        const res2=await productSchema.findById({_id:productid});
        
        return res.json({msg:"disliked",likes:res2.likes.length})
     }else{
      await productSchema.findOneAndUpdate({_id:productid},{$push:{
        likes:{users:user.toString()}
       }});
       const res2=await productSchema.findById({_id:productid});
       return res.json({msg:"liked",likes:res2.likes.length})
     }
   }
  }catch(error){
    console.log(error);
  }
})
router.post("/check",authorization,async (req,res)=>{
  try{
const user=req.userid;
const productid=req.body.id;
   const result=await productSchema.findById({_id:productid});
   if(result){
     const detail=result.likes.find(item=>item.users.toString()===user.toString())
     
     if(detail){
        return res.json({msg:"liked"})
     }else{
       return res.json({msg:"disliked"})
     }
   }
  }catch(error){
    console.log(error);
  }
})

//color

module.exports=router;