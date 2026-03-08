import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    },
    status: {
        type: String,
        enum: ['active', 'completed'], // Chỉ cho phép các giá trị này
        default: 'active', // Giá trị mặc định là 'active'
    },
    completedAt: {
        type: Date,
        default: null, // Mặc định là null, chỉ có giá trị khi task được hoàn thành
    },
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

const Task = mongoose.model('Task', taskSchema);
export default Task;
