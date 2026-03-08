import Header from '@/components/Header';
import StatsAndFillters from '@/components/StatsAndFillters';
import AddTask from '@/components/AddTask';
import DateTimeFillter from '@/components/DateTimeFillter';
import Footer from '@/components/Footer';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchTasks(); // sử dụng useEffect theo dõi 1 hoặc nhiều state, thực hiện một số hành động phụ khi state đó thay đổi. Nếu mảng phụ thuộc rỗng, 
    // useEffect sẽ chỉ chạy một lần sau khi component được render lần đầu tiên, tương tự như componentDidMount trong class component. Điều này rất hữu ích để thực hiện các tác vụ khởi tạo, như gọi API để lấy dữ liệu ban đầu hoặc thiết lập các sự kiện lắng nghe. Trong trường hợp này, useEffect được sử dụng để gọi hàm fetchTasks khi component HomePage được mount, giúp lấy dữ liệu từ API và cập nhật state taskBuffer với dữ liệu nhận được.
  }, [dateQuery]);

  useEffect(() => {
    setPage(1)
  }, [filter, dateQuery])
  
  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);

    } catch (error) {
      console.error("Error retrieving database:", error);
      toast.error("Failed to retrieve database. Please try again later.");

    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // var
  // tại sao không dùng state ? => để home page render lại, kết quả render lại 
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice( // slice dùng để cắt mảng
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit

  );

  if (visibleTasks.length === 0) {
    handlePrev()
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleDeleteAllTasks = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa TẤT CẢ công việc không?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks`);
      toast.success("All tasks are deleted successfully!");
      fetchTasks(); // Load lại danh sách rỗng
    } catch (error) {
      console.error("Error to delete:", error);
      toast.error("Failed to delete all tasks T.T");
    }
  };

    return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      {/* Concentric Squares - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
            repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
            repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
            repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
          `,
        }}
  />
            {/* Your Content/Components */}
        <div className="container pt-8 mx-auto relative z-10">
            <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

                {/* Header */}
                <Header/>
                
                {/* Add Task */}
            <AddTask handleNewTaskAdded={ handleTaskChanged } />

                {/* Stats and Fillters */}
            <StatsAndFillters
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
              handleDeleteAllTasks={handleDeleteAllTasks}
            />
                
                {/* Task List */}
            <TaskList filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChanged={handleTaskChanged}
            />
                
                {/* Divide page and date fillter */}
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
                    <DateTimeFillter  dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                </div>

                {/* Footer */}
            <Footer
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            /> 
                </div>
            </div>
        </div> 
    );
}

export default HomePage; 