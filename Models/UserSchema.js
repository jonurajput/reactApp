const mongoose=require("mongoose")

const reqStr={
    type:"String",
    required:true
}
const userSchema=mongoose.Schema({
    name:reqStr,
    email:reqStr,
    password:reqStr,
   
},{
    timestamps:true
})


module.exports=mongoose.model("user",userSchema)