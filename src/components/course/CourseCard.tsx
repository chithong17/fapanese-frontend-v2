
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "lucide-react";
import { Button } from "../ui/button";

// Interface cho component (dữ liệu đã được chuyển đổi)


const CourseCard: React.FC = () => {

    return (
        <section className="w-full bg-gray-100 py-30 px-6 break-all">
            <div className="max-w-7xl mx-auto grid gap-10">
                <Card
                    key="1"
                    className="relative group overflow-hidden rounded-3xl border-gray-200 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                    {/* CardContent thường có padding mặc định, ta dùng p-0 để tự control layout bằng grid bên trong */}
                    <CardContent className="p-0">
                        <div className="grid grid-cols-10 items-center gap-6 p-6 sm:p-3">

                            {/* --- Cột Hình ảnh (Bên trái theo Grid, Code cũ comment là Phải nhưng luồng DOM là trước) --- */}
                            <div className="col-span-10 flex flex-col items-center justify-center space-y-4 sm:col-span-6 relative">
                                <img
                                    src="https://res.cloudinary.com/dsfpeioth/image/upload/v1767532653/jpd113_mggdht.png"
                                    alt="1"
                                    className="h-[75%] w-full object-cover rounded-2xl shadow-md transition duration-500"
                                />
                            </div>

                            {/* --- Cột Thông tin (Bên phải) --- */}
                            <div className="col-span-10 space-y-3 px-5 py-5 text-right tracking-wider sm:col-span-4">

                                {/* Header: Giá & Tên */}
                                <div className="flex flex-col items-end gap-2">
                                    <Badge
                                        className="rounded-2xl bg-red-700 px-3 py-1 text-base font-bold text-white hover:bg-red-800"
                                    >
                                        Miễn phí
                                    </Badge>
                                    <span className="font-sans text-3xl font-semibold text-green-950">
                                        できる日本語 (SƠ)
                                    </span>
                                </div>

                                {/* Mã khóa học */}
                                <h2 className="font-sans text-6xl font-bold text-[#023333]">
                                    JPD113
                                </h2>

                                {/* Mô tả */}
                                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                                    できる日本語! - Tiến bộ nhanh chóng cùng
                                </p>
                                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                                    FAPANESE!
                                </p>

                                {/* Thời lượng */}
                                <p className="font-semibold text-gray-900">
                                    ⏱ Thời lượng: 12 tuần
                                </p>

                                <br />

                                {/* Button Action */}
                                {/* Sử dụng asChild để render Link bên trong Button của Shadcn */}
                                <Button
                                    asChild
                                    className="h-auto rounded-3xl border border-[#B2EBF2] bg-gradient-to-r from-[#9bced5] to-[#9cdfe8] px-10 py-2 text-lg font-bold text-white shadow-lg hover:opacity-90 hover:shadow-xl"
                                >
                                    <Link to={`/courses/1`}>
                                        BẮT ĐẦU HỌC!
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default CourseCard;
