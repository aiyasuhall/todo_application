import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) { // cn sự kết hợp clsx để viết lớp có điều kiện gọn hơn
  return twMerge(clsx(inputs)); // xử lí xung đột khi gộp nhiều class tailwind lại
}
