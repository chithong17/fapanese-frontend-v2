"use client";

import { useEffect } from "react";
import { useCourseStore } from "@/stores/useCoureStore"
import { Link } from "react-router-dom";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react"; // Cài lucide-react nếu chưa có
import CourseCard from "@/components/course/CourseCard";

export default function CourseList() {
    // 1. Lấy state và actions từ store
    const { courseList, loading, fetchCourses, deleteCourse } = useCourseStore();

    // 2. Gọi API khi component được mount
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // 3. Hàm xử lý xóa
    const handleDelete = async (id: number) => {
        if (confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
            await deleteCourse(id);
        }
    };

    // 4. Loading State
    if (loading && courseList.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <>
            <CourseCard />
            <div className="p-6 bg-white rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách khóa học</h1>
                    <Link
                        to="/courses/create"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        <Plus size={18} /> Thêm mới
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 uppercase font-medium border-b">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Tên khóa học</th>
                                <th className="p-4">Mã (Code)</th>
                                <th className="p-4">Giá</th>
                                <th className="p-4">Cấp độ</th>
                                <th className="p-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList.length > 0 ? (
                                courseList.map((course) => (
                                    <tr key={course.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium">{course.id}</td>
                                        <td className="p-4 text-gray-900 font-semibold">
                                            <Link to={`/courses/${course.id}`} className="hover:text-blue-600 hover:underline">
                                                {course.courseName}
                                            </Link>
                                        </td>
                                        <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{course.code}</span></td>
                                        <td className="p-4 text-green-600 font-bold">{course.price}</td>
                                        <td className="p-4">{course.level}</td>
                                        <td className="p-4 flex justify-end gap-3">
                                            <Link
                                                to={`/courses/${course.id}/edit`}
                                                className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                disabled={loading}
                                                className="text-red-600 hover:bg-red-100 p-2 rounded-full transition disabled:opacity-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        Chưa có dữ liệu khóa học.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}