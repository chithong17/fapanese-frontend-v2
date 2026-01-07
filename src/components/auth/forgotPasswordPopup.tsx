// src/components/ForgotPasswordPopup.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Thêm AnimatePresence nếu cần animation mượt khi unmount
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiKey } from "react-icons/bi";
import axios, { AxiosError } from 'axios';
import { toast } from "sonner";

interface ForgotPasswordPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [show, setShow] = useState(isOpen);
    const [animate, setAnimate] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle open/close animation
    useEffect(() => {
        if (isOpen) {
            setShow(true);
            // Delay nhỏ để đảm bảo DOM đã render trước khi add class opacity
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
            setTimeout(() => setShow(false), 300);
        }
    }, [isOpen]);

    const handleSendOtp = async () => {
        if (!email){
           toast.error("Vui lòng nhập email");
           return;
        } 
        try {
            await axios.post(
                "http://localhost:8080/fapanese/api/auth/forgot-password",
                { email },
                { headers: { "Content-Type": "application/json" } }
            );
            setOtpSent(true);
            toast.success("OTP đã được gửi đến email!");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Không gửi được OTP");
        }
    };

    const handleReset = async () => {
        if (!email || !otp || !newPassword || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return
        }

        if (newPassword !== confirmPassword){
            toast.error("Mật khẩu không khớp")
            return
        }

        try {
            setLoading(true);
            await axios.post(
                "http://localhost:8080/fapanese/api/auth/reset-password",
                { email, otp, newPassword }
            );
            toast.success("Đặt lại mật khẩu thành công");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Đặt lại mật khẩu thất bại");
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    // Responsive styles: p-2 trên mobile, p-3 trên tablet trở lên
    const inputWrapper =
        "flex items-center gap-2 w-full p-2.5 sm:p-3 rounded-xl border-2 border-gray-200 focus-within:border-[#14a5a5] focus-within:shadow-md focus-within:shadow-[#14a5a530] transition-all duration-300 bg-gray-50/50";
    const inputStyle = "flex-1 border-none outline-none bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400";

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"
                }`}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                // ✅ RESPONSIVE UPDATE:
                // - w-full: Full width trên mobile
                // - max-w-md: Giới hạn chiều rộng trên desktop
                // - max-h-[90vh]: Giới hạn chiều cao để không bị mất nội dung khi xoay ngang đt
                // - overflow-y-auto: Cho phép cuộn khi nội dung dài
                // - p-5 sm:p-8: Padding nhỏ hơn trên mobile để tiết kiệm diện tích
                className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-5 sm:p-8 overflow-hidden overflow-y-hidden max-h-[90vh] overflow-y-auto custom-scrollbar`}
            >
                {/* Close button - Tăng kích thước vùng bấm cho mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition z-10"
                >
                    ✕
                </button>

                {/* Header - Font size nhỏ hơn trên mobile */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-6 text-center mt-2 sm:mt-0">
                    Quên mật khẩu
                </h1>

                <p className="text-center text-gray-500 text-sm mb-6 px-2">
                    Nhập email để nhận mã OTP xác thực
                </p>

                {/* Email */}
                <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-600 font-medium mb-1 text-sm sm:text-base">
                        Email<span className="text-red-600">*</span>
                    </label>
                    <div className={inputWrapper}>
                        <HiOutlineMail className="text-gray-500 text-lg sm:text-xl shrink-0" />
                        <input
                            type="email"
                            autoComplete="email"
                            placeholder="Nhập email tại đây"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* Mật khẩu mới */}
                <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-600 font-medium mb-1 text-sm sm:text-base">
                        Mật khẩu mới<span className="text-red-600">*</span>
                    </label>
                    <div className={inputWrapper}>
                        <RiLockPasswordLine className="text-gray-500 text-lg sm:text-xl shrink-0" />
                        <input
                            type="password"
                            autoComplete="new-password"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* Xác minh mật khẩu */}
                <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-600 font-medium mb-1 text-sm sm:text-base">
                        Xác minh mật khẩu<span className="text-red-600">*</span>
                    </label>
                    <div className={inputWrapper}>
                        <RiLockPasswordLine className="text-gray-500 text-lg sm:text-xl shrink-0" />
                        <input
                            type="password"
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* OTP & Button */}
                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-1 text-sm sm:text-base">
                        Mã xác minh<span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-2 items-stretch">
                        <div className={`${inputWrapper} !w-auto flex-1`}>
                            <BiKey className="text-gray-500 text-lg sm:text-xl shrink-0" />
                            <input
                                type="text"
                                placeholder="Mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={inputStyle}
                            />
                        </div>
                        {/* Nút OTP responsive: text nhỏ hơn và padding ít hơn trên mobile */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendOtp}
                            className={`px-3 sm:px-4 py-2 rounded-xl font-semibold text-white text-sm sm:text-base whitespace-nowrap shadow-md transition flex items-center justify-center ${otpSent
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#14a5a5] to-[#0c9c9c] hover:opacity-90"
                                }`}
                            disabled={otpSent}
                        >
                            {otpSent ? "Đã gửi" : "Lấy mã"}
                        </motion.button>
                    </div>
                </div>

                {/* Reset button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className={`w-full py-3 rounded-xl sm:rounded-2xl font-bold text-white shadow-lg text-sm sm:text-base transition transform ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#14a5a5] to-[#0c9c9c] hover:translate-y-[-2px] hover:shadow-xl"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPopup;