import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentService } from "../../../services";
import { Transaction } from "../../../interfaces/Payment/Transaction";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PaymentProviderType } from "../../../common/enums";

export default function PaymentNavigate() {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        AOS.init();
    }, []);
    // Initialize variables to store each parameter
    const amountString = searchParams.get("vnp_Amount") || "";
    const bankCode = searchParams.get("vnp_BankCode") || "";
    const cardType = searchParams.get("vnp_CardType") || "";
    const orderInfo = searchParams.get("vnp_OrderInfo") || "";
    const payDate = searchParams.get("vnp_PayDate") || "";
    const responseCode = searchParams.get("vnp_ResponseCode") || "";
    const tmnCode = searchParams.get("vnp_TmnCode") || "";
    const transactionNo = searchParams.get("vnp_TransactionNo") || "";
    const transactionStatus = searchParams.get("vnp_TransactionStatus") || "";
    const txnRef = searchParams.get("vnp_TxnRef") || "";
    const secureHash = searchParams.get("vnp_SecureHash") || "";
    const amount = Number.parseFloat(amountString);
    const [transaction, setTransaction] = useState<Transaction>();
    const navigate = useNavigate();
    useEffect(() => {
        const handleUpdateTransactionAsync = async () => {
            try {
                const data = await PaymentService.updateTransactionAsync({
                    amount,
                    bankCode,
                    cardType,
                    orderInfo,
                    payDate,
                    responseCode,
                    secureHash,
                    tmnCode,
                    transactionNo,
                    transactionStatus,
                    txnRef
                });
                setTransaction(data);


            } catch (error) {
                console.error("Error fetching payment unpaid", error);

            }
        };
        handleUpdateTransactionAsync();
    }, []);

    const formatAmount = (amount: string | undefined) => {
        if (amount !== undefined && amount !== null) {
            const numericAmount = Number(amount) / 100;
            const formattedAmount = numericAmount.toLocaleString('en-US');
            return `${formattedAmount} VND`;
        }
        return '';
    };
    return (
        <>
            <div data-aos="zoom-in-left" data-aos-duration="1000">
                {transaction?.transactionStatus == "00" && (
                    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="h-12 w-12 text-green-500"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <h1 className="font-semibold text-3xl">Payment successful</h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/tight dark:text-gray-400">
                                Your order has been confirmed and is now being processed. Thank you for shopping with us!
                            </p>
                        </div>
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm p-0" data-v0-t="card">
                            <div className="p-4 md:p-6">
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Order number:</div>
                                        <div>#{transaction?.tmnCode}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Date:</div>
                                        <div>{transaction?.payDate}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Payment method:</div>
                                        <div>{transaction?.cardType}</div>
                                    </div>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Amount:</div>
                                        <div>{formatAmount(transaction?.amount.toString())}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Payment Gateway:</div>
                                        <div>{PaymentProviderType[transaction?.paymentGateway || 0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center flex w-full p-4 md:p-6">
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
                                    onClick={() => navigate('/enroll-class?id=' + transaction?.learningModulePaymentOrder.learningModuleId + '&section=payment')}
                                >
                                    Go back
                                </button>
                            </div>
                        </div>
                    </div>)}
                {transaction?.transactionStatus !== "00" &&
                    (<div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <svg fill="#ff0000" width="24"
                                height="24" className="h-12 w-12 text-green-500" viewBox="0 -8 528 528" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>fail</title><path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path></g></svg>
                            <h1 className="font-semibold text-3xl">Payment fail</h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/tight dark:text-gray-400">
                                Your order has not been confirmed and is now being processed. Please try pay again
                            </p>
                        </div>
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm p-0" data-v0-t="card">
                            <div className="p-4 md:p-6">
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Order number:</div>
                                        <div>#{transaction?.tmnCode}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Date:</div>
                                        <div>{transaction?.payDate}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Payment method:</div>
                                        <div>{transaction?.cardType}</div>
                                    </div>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Amount:</div>
                                        <div>{formatAmount(transaction?.amount.toString())}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium">Payment Gateway:</div>
                                        <div>{PaymentProviderType[transaction?.paymentGateway || 0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-center flex w-full p-4 md:p-6">
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
                                    onClick={() => navigate('/enroll-class?id=' + transaction?.learningModulePaymentOrder.learningModuleId + '&section=payment')}
                                >
                                    Go back
                                </button>
                            </div>
                        </div>
                    </div>)}</div>
        </>
    );
}
