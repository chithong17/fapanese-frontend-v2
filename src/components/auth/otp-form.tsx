import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, } from "@/components/ui/input-otp"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router"
import placeholderOTP from "@/assets/placeholderOTP.jpg"

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const { loading, verifyOTP, sendOTP } = useAuthStore();
  const navigate = useNavigate();

  const [email] = useState(() => localStorage.getItem("otp_email") || "");

  const [otpValue, setOtpValue] = useState("")

  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);


  const handleResend = async () => {
    if (countdown > 0 || !email) return;

    try {
      await sendOTP(email);
      toast.success("Đã gửi lại mã OTP mới đến: "+email);
      setCountdown(10); // Bắt đầu đếm ngược 10s
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Không thể gửi lại mã. Vui lòng thử lại sau.")
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otpValue.length < 6) {
      toast.error("Vui lòng nhập đủ 6 chữ số.")
      return
    }

    try {

      await verifyOTP(email, otpValue); // Hoặc verifyOTP(email, otpValue) nếu bạn sửa store

      toast.success("Xác thực OTP thành công! Vui lòng thực hiện đăng nhập")
      localStorage.removeItem("otp_email")
      navigate("/login")

    } catch (err) {
      setOtpValue("");
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Mã OTP không đúng hoặc đã hết hạn.")
    }
  }


  return (
    <div
      className={cn("flex flex-col gap-6 md:min-h-[450px]", className)}
      {...props}
    >
      <Card className="flex-1 overflow-hidden p-0">
        <CardContent className="grid flex-1 p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-6 md:p-8">
            <FieldGroup>
              <Field className="items-center text-center">
                <h1 className="text-2xl font-bold">Xác thực mã OTP</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Mã OTP 6 chữ số đã được gửi đến email của bạn (có thể nằm trong <strong>thư rác/spam</strong>).
                </p>
              </Field>
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP maxLength={6} id="otp" required containerClassName="gap-4 justify-center"
                  value={otpValue}
                  onChange={setOtpValue}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-center">
                  Nhập mã OTP của bạn tại đây
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Xác thực</Button>
                <div className="text-center mt-2 text-sm text-muted-foreground">
                  Không nhận được mã?{" "}
                  {/* 6. Thay thế thẻ <a> bằng Button */}
                  <Button
                    type="button" // Quan trọng: type="button" để không trigger submit form
                    variant="link"
                    className="p-0 h-auto font-normal text-primary"
                    onClick={handleResend}
                    disabled={countdown > 0 || loading}
                  >
                    {countdown > 0 
                      ? `Gửi lại sau ${countdown}s` 
                      : "Gửi lại"}
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              srcSet={placeholderOTP}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
