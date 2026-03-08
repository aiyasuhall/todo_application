// Nơi định nghĩa các API endpoint
import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask, deleteAllTasks } from '../controllers/tasksControllers.js';

const router = express.Router();

router.get("/", getAllTasks); // Khi có request GET đến /api/tasks sẽ gọi hàm getAllTasks để lấy tất cả task

router.post("/", createTask); // Khi có request POST đến /api/tasks sẽ gọi hàm createTask để tạo một task mới với dữ liệu từ body của request

router.put("/:id", updateTask); // Khi có request PUT đến /api/tasks/:id sẽ gọi hàm updateTask để cập nhật task với id tương ứng, dữ liệu cập nhật lấy từ body của request

router.delete("/:id", deleteTask); // Khi có request DELETE đến /api/tasks/:id sẽ gọi hàm deleteTask để xóa task với id tương ứng (hiện tại chỉ trả về message mà chưa thực hiện xóa trong database)

router.delete("/", deleteAllTasks);

export default router;

