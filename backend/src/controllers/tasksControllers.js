// Nơi chứa logic xử lí chính
import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case "today": {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "week": {
            const mondayDate = now.getDate() - (now.getDate() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all":
        default: {
            startDate = null
            }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try { 
        // -1 là lấy từ dưới lên trên, 1 là lấy từ trên xuống dưới
        const result = await Task.aggregate([
        {$match: query},
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount }); // Trả về danh sách task dưới dạng JSON
        
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có vấn đề với server
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body; // Lấy title từ body của request
        const task = new Task({ title }); // Tạo một task mới với title

        const newTask = await task.save(); // Lưu task vào database
        res.status(201).json(newTask); // Trả về task mới được tạo dưới dạng JSON

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có vấn đề với server
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body; // Lấy title, status, completedAt từ body của request
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id, // Lấy id từ params của request
            {
                title,
                status,
                completedAt
            }, // Cập nhật title, status, completedAt
            { new: true } // Trả về task đã được cập nhật
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Task not found" }); // Trả về lỗi nếu không tìm thấy task
        }
        
        res.status(200).json(updateTask); // Trả về task đã được cập nhật dưới dạng JSON
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có vấn đề với server
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id); // Lấy id từ params của request và xóa task tương ứng trong database

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" }); // Trả về lỗi nếu không tìm thấy task
        }
        return res.status(200).json({ message: "Task deleted successfully" }); // Trả về message nếu xóa thành công
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có vấn đề với server
    }
}

export const deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({}); // Xóa toàn bộ document trong collection Task
        return res.status(200).json({ message: "All tasks deleted successfully" });
    } catch (error) {
        console.error("Error deleting all tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
