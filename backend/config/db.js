import mongoose from "mongoose"


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is Connected!!")
    }
    catch (error) {
        console.log('MongoDB connection error: ', error);
        process.exit(1)
    }
}

export default connectDB