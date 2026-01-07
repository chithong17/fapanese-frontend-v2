// 1. Khai báo Object hằng số (Thay thế cho enum)
export const UserStatus = {
  REJECTED: -1,          // Bị từ chối
  UNVERIFIED_EMAIL: 0,   // Đăng ký chưa xác thực email
  VERIFIED_UNACTIVE: 1,  // Đã xác thực email, chưa active
  PENDING_APPROVAL: 2,   // Đã xác thực, đang chờ Admin duyệt (Lecturer)
  ACTIVE: 3              // Hoạt động bình thường
} as const; // <--- Quan trọng: as const giúp cố định giá trị (literal types)

// 2. Tạo Type từ Object đó (Để dùng làm kiểu dữ liệu)
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];  