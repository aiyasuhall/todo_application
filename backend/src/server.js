import express from 'express';
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

dotenv.config();
const PORT = process.env.PORT || 5001; // Sử dụng PORT từ biến môi trường hoặc mặc định là 5001
const __dirname = path.resolve();

const app = express();

//middleware
app.use(express.json()); // Middleware để parse JSON từ request body

// Middleware để cho phép CORS, giúp frontend có thể gửi request đến backend mà không bị chặn bởi chính sách cùng nguồn (Same-Origin Policy)
if (process.env.NODE_ENV !== "production") {
    app.use(cors({origin: "http://localhost:5173"}));
}

app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    }); //gộp frontend và backend, với mọi request không phải api, trả về trang index.html
}

connectDB().then(() => { // Kết nối đến database thành công thì mới bắt đầu lắng nghe các request đến server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`); // thiếu type module trong package.json => thêm "type": "module" vào package.json để sử dụng import/export
    });
})