const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
       const connect=await mongoose.connect(process.env.MONGO_URI)
       console.log(`Connect DB succcess! ${connect.connection.host}`);
    }catch(err){
        console.log(err);

    }
    
}
module.exports=connectDb