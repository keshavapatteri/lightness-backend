
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB CONNECTED SUCCESS");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

// Export the connectDB function
export default connectDB;
