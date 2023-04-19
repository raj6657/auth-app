const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
       useNewUrlParser:true,
    //    createIndexes:true,
       useUnifiedTopology:true,
    //    updateOne:true 
    });
    console.log("MongoDB connected");
};

module.exports=connectDB;