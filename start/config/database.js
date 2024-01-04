import mongoose from "mongoose";
import Color from "colors";



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected To Mongodb DataBase ${conn.connection.host}`.bgMagenta.white);
    } catch(error){
        console.log(`Error in mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;