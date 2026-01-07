import { OTPForm } from "@/components/auth/otp-form"


const VerifyOTPPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 absolute inset-0 z-0 " style={{ backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`, backgroundSize: "100% 100%", }}>
      <div className="w-full max-w-sm md:max-w-3xl">
        <OTPForm />
      </div>
    </div>
  )
}

export default VerifyOTPPage