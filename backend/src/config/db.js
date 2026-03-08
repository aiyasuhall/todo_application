import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING); // Kết nối đến MongoDB bằng chuỗi kết nối từ biến môi trường

        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
        console.error("🔍 Chi tiết lỗi:", error.message);
        // process.exit(1); // Exit the process with failure code (số 0 là thoát với trạng thái thành công)
    }
}; 