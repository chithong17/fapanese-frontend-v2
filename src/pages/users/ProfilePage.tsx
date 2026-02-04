import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/useAuthStore";
import { userService } from "@/services/userService";
import { fileService } from "@/services/fileService";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera, Lock, User, Mail, MapPin, Briefcase, CalendarDays, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ChangePasswordPayload, UpdateProfilePayload } from "@/types/user";
import type { AxiosError } from "axios";
import { STORAGE_FOLDERS, DEFAULT_IMAGES } from "@/types/fileStorage";

const CAMPUSES = ["Quy Nhơn", "Đà Nẵng", "Hà Nội", "TP. Hồ Chí Minh", "Cần Thơ"];

export default function ProfilePage() {
    const { loginUser, fetchMe } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadingAvt, setUploadingAvt] = useState(false); // Loading riêng cho avatar

    // Form Thông tin
    const profileForm = useForm<UpdateProfilePayload>({
        defaultValues: {
            firstName: loginUser?.firstName || "",
            lastName: loginUser?.lastName || "",
            dateOfBirth: loginUser?.dateOfBirth || "",
            campus: loginUser?.campus || "",
            expertise: loginUser?.expertise || "",
            bio: loginUser?.bio || "",
            avtUrl: loginUser?.avtUrl || "",
        }
    });
    // Form Mật khẩu
    const passwordForm = useForm({
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
    });

    const userRole = profileForm.watch("role");

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Kiểm tra kích thước file
            if (file.size > MAX_FILE_SIZE) {
                toast.error("Kích thước ảnh quá lớn (tối đa 10MB)");
                e.target.value = ""; // Reset input file
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const cancelAvatarChange = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleUploadAvatar = async () => {
        if (!selectedFile || !loginUser) return; // Đảm bảo loginUser tồn tại

        try {
            setUploadingAvt(true);

            // 1. Upload file
            const newAvtUrl = await fileService.uploadFile(selectedFile, STORAGE_FOLDERS.AVATARS);

            // 2. Tạo payload và ÉP KIỂU/CHUẨN HÓA dữ liệu
            // Sử dụng toán tử ?? "" để thay thế undefined bằng chuỗi rỗng
            const fullPayload: UpdateProfilePayload = {
                ...loginUser,
                firstName: loginUser.firstName ?? "",
                lastName: loginUser.lastName ?? "",
                avtUrl: newAvtUrl,
                campus: loginUser.campus ?? "", // Chuyển undefined thành ""
                expertise: loginUser.expertise ?? "",
                bio: loginUser.bio ?? "",
                dateOfBirth: loginUser.dateOfBirth ?? "",
            };

            // 3. Gọi API
            await userService.updateProfile(fullPayload);

            // 4. Xử lý sau khi thành công
            if (loginUser?.avtUrl && !loginUser.avtUrl.includes(DEFAULT_IMAGES.AVATAR)) {
                try {
                    await fileService.deleteFileByUrl(loginUser.avtUrl);
                } catch (e) { console.error(e); }
            }

            await fetchMe();
            toast.success("Cập nhật ảnh đại diện thành công!");
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Lỗi cập nhật ảnh");
        } finally {
            setUploadingAvt(false);
        }
    };

    const onUpdateProfile = async (data: UpdateProfilePayload) => {
        try {
            setLoading(true);
            await userService.updateProfile(data);
            await fetchMe();
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Cập nhật thất bại.");
        } finally {
            setLoading(false);
        }
    };



    const onChangePassword = async (data: ChangePasswordPayload) => {
        // data lúc này có cấu trúc: { currentPassword: "...", newPassword: "...", confirmPassword: "..." }

        try {
            setLoading(true);

            // Đảm bảo chỉ gửi 2 trường mà Backend yêu cầu và chúng phải là String
            const payload: ChangePasswordPayload = {
                currentPassword: String(data.currentPassword).trim(),
                newPassword: String(data.newPassword).trim(),
            };

            console.log("Payload gửi đi:", payload); // Kiểm tra xem có bị bọc trong object nào không

            await userService.changePassword(payload);

            toast.success("Đổi mật khẩu thành công!");
            passwordForm.reset();
        } catch (error) {
            const err = error as AxiosError<{ code: number, message: string }>;
            toast.error(err.response?.data?.message || "Đã xảy ra lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">

                {/* CỘT TRÁI: TỔNG QUAN */}
                <div className="md:col-span-4 lg:col-span-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <Avatar className="h-28 w-28 border-4 border-secondary">
                                        <AvatarImage src={previewUrl || loginUser?.avtUrl || undefined} />
                                        <AvatarFallback className="text-2xl">{loginUser?.firstName?.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <label htmlFor="avt-upload" className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform">
                                        <Camera className="h-4 w-4" />
                                        <input id="avt-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                                {/* Nút xác nhận đổi ảnh xuất hiện khi có file được chọn */}
                                {selectedFile && (
                                    <div className="flex gap-2 mt-3 mx-auto mb-4 animate-in fade-in zoom-in duration-200">
                                        <Button size="sm" variant="outline" onClick={cancelAvatarChange} disabled={uploadingAvt}>
                                            <X className="h-4 w-4 mr-1" /> Hủy
                                        </Button>
                                        <Button size="sm" onClick={handleUploadAvatar} disabled={uploadingAvt}>
                                            {uploadingAvt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                                            Lưu ảnh
                                        </Button>

                                    </div>
                                )}
                                <h2 className="text-xl font-bold">{loginUser?.firstName} {loginUser?.lastName}</h2>
                                <Badge className="text-sm text-white px-4 mt-3 mb-4">{loginUser?.role}</Badge>

                                <div className="w-full space-y-3 text-sm text-left border-t pt-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" /> <span>{loginUser?.email}</span>
                                    </div>
                                    {loginUser?.campus && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" /> <span>{loginUser?.campus}</span>
                                        </div>
                                    )}
                                    {loginUser?.dateOfBirth && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="h-4 w-4" /> <span>{loginUser?.dateOfBirth}</span>
                                        </div>
                                    )}
                                    {loginUser?.expertise && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Briefcase className="h-4 w-4" /> <span>{loginUser?.expertise}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CỘT PHẢI: TABS CONTENT */}
                <div className="md:col-span-8 lg:col-span-8">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="profile" className="flex gap-2">
                                <User className="h-4 w-4" /> Thông tin cá nhân
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex gap-2">
                                <Lock className="h-4 w-4" /> Bảo mật
                            </TabsTrigger>
                        </TabsList>

                        {/* TAB 1: THÔNG TIN */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chỉnh sửa hồ sơ</CardTitle>
                                    <CardDescription>Thông tin này sẽ được hiển thị trên hệ thống.</CardDescription>
                                </CardHeader>
                                <form onSubmit={profileForm.handleSubmit(onUpdateProfile)}>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Họ</Label>
                                                <Input {...profileForm.register("firstName")} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tên</Label>
                                                <Input {...profileForm.register("lastName")} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="space-y-2">
                                                <Label>Ngày sinh</Label>
                                                <Input type="date" {...profileForm.register("dateOfBirth")} />

                                            </div>

                                            {userRole === "STUDENT" && (
                                                <div className="space-y-2">
                                                    <Label>Cơ sở</Label>
                                                    <Select defaultValue={loginUser?.campus || "Chọn cơ sở"} onValueChange={(v) => profileForm.setValue("campus", v)}>
                                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            {CAMPUSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            {userRole === "LECTURER" && (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label>Chuyên môn</Label>
                                                        <Input {...profileForm.register("expertise")} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Tiểu sử</Label>
                                                        <Textarea {...profileForm.register("bio")} rows={4} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="justify-end">
                                        <Button type="submit" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Lưu thông tin
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        {/* TAB 2: BẢO MẬT */}
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Đổi mật khẩu</CardTitle>
                                    <CardDescription>Đảm bảo mật khẩu của bạn có ít nhất 8 ký tự để bảo mật.</CardDescription>
                                </CardHeader>
                                <form onSubmit={passwordForm.handleSubmit(onChangePassword)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Mật khẩu hiện tại</Label>
                                            <Input type="password" {...passwordForm.register("currentPassword", { required: true })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mật khẩu mới</Label>
                                            <Input type="password" {...passwordForm.register("newPassword", { required: true, minLength: 8 })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Xác nhận mật khẩu mới</Label>
                                            <Input type="password" {...passwordForm.register("confirmPassword", { required: true })} />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="justify-end">
                                        <Button type="submit" variant="destructive" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Cập nhật mật khẩu
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    );
}