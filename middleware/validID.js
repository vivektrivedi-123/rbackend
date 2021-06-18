const mongoose = require("mongoose")
const validID = async (req,res,next)=>{
    try {
        let isValidID = await mongoose.isValidObjectId({_id:req.params.id})
        if(!isValidID){
            res.status(500).json({message:"somthing went wrong"})
        } else{
            next()
        }  
    } catch (error) {
       res.json({message:error.message})   
    }
}
module.exports = validID