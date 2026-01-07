// 1. Định nghĩa đối tượng Course (Khớp với "result" trong API)
export interface Course {
  id: number;
  courseName: string;
  description: string;
  imgUrl: string;
  price: string;
  level: string;
  code: string;
  title: string;
  duration: string;
}

// 2. Dữ liệu gửi lên khi Tạo/Sửa (Request Body)
export interface CoursePayload {
  courseName: string;
  description: string;
  imgUrl: string;
  price: string;
  level: string;
  code: string;
  title: string;
  duration: string;
}

// 3. Generic Wrapper cho Response (Dựa trên Schema chung của API)
// { "code": 0, "message": "string", "result": T }
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

// 4. Các Type cụ thể dùng cho Service (để code dễ đọc)
export type CourseListResponse = ApiResponse<Course[]>;      // Cho GET /api/courses
export type CourseDetailResponse = ApiResponse<Course>;      // Cho GET /api/courses/{id}, POST, PUT
export type CourseDeleteResponse = ApiResponse<object>;      // Cho DELETE (result là {})