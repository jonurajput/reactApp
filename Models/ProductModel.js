const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const reqType={
    type:"String",
    required:true
}
const ProductSchema=mongoose.Schema({
   place:reqType,
  time:reqType,
  mediaUrl:reqType,
  user:reqType,
  likes:[
       {
           users:reqType
       }
   ]

})

module.exports=mongoose.model("product",ProductSchema)