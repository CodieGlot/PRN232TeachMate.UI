import { useState } from "react";
import { AuthService } from "../../../services";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email } = state;
    const [message, setMessage] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Allow only numeric and max 4 characters
        if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
        }
    };

    const handleSaveClick = async () => {
        if (otp.length < 4) {
            toast.error("Please enter the 4-digit OTP");
            return;
        }

        try {
            await AuthService.VerifyOTP({
                email,
                otp
            });

            navigate("/auth/Forgetpassword", { state: { email } });
        } catch (err) {
            console.error("verify failed:", err);

            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<any>;

                if (axiosError.response) {
                    const { data } = axiosError.response;

                    if (data?.errors) {
                        Object.values(data.errors).forEach((errMsgList) => {
                            (errMsgList as string[]).forEach((errMsg: string) => {
                                toast.error(errMsg);
                            });
                        });
                    } else if (data?.message) {
                        toast.error(data.message);
                    } else {
                        toast.error("An unknown error occurred.");
                    }
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
                <p className="text-[15px] text-slate-500">
                    Enter the 4-digit verification code that was sent to your phone number.
                </p>
            </header>
            <form id="otp-form">
                <div className="flex items-center justify-center">
                    <input
                        value={otp}
                        onChange={handleInputChange}
                        type="text"
                        inputMode="numeric"
                        className="w-36 h-14 text-center text-2xl font-extrabold tracking-widest text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        pattern="\d*"
                        maxLength={4}
                        placeholder="____"
                    />
                </div>
                <p className="text-sm text-red-500 p-4 text-center">{message}</p>
                <div className="max-w-[260px] mx-auto mt-4">
                    <button
                        onClick={handleSaveClick}
                        type="button"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                    >
                        Verify Account
                    </button>
                </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <a
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    href="/auth/SendOTP"
                >
                    Resend
                </a>
            </div>
        </div>
    );
}
