import { useEffect, useState, } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { AuthService, PaymentService } from "../../../services";
import { PaymentOrder } from "../../../interfaces";
import ModalForPayment from "../../Modal/ModalForPayment";
import styles from "./payment.module.css"
import { PaymentProviderType } from "../../../common/enums";

export function LearnerPayment() {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [learningModule, setLearningModule] = useState<LearningModule>();
    const [paymentList, setPaymentList] = useState<PaymentOrder[]>();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const user = AuthService.getCurrentUser();
    const [selectedPayment, setSelectedPayment] = useState<PaymentProviderType>(PaymentProviderType.None);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = parseInt(event.target.value, 10) as PaymentProviderType;
        setSelectedPayment(selectedValue);
    };
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const navigate = useNavigate();

    const HandlePayForClass = async () => {
        try {
            // await PaymentService.payForClass(UnPaidPayment?.id)
           
            const response = await PaymentService.createNewTransaction({
                amount: UnPaidPayment?.paymentAmount || 0,
                paymentGateway: selectedPayment,
                learningModulePaymentOrderId: UnPaidPayment?.id || 0
            })
            window.location.href = response.orderUrl;
            console.log(response);
           
        } catch (error) {
            console.error("Error Pay For class", error);

        }
    }
    const [UnPaidPayment, setUnPaidPayment] = useState<PaymentOrder>()
    useEffect(() => {
        const listUnpaidPayment = async () => {
            try {
                const data = await LearningModuleService.getLearningModuleById(id);
                setLearningModule(data)
                const data1 = await PaymentService.getAllUnPaidByModuleIdByLearnerId(id);
                setUnPaidPayment(data1)

            } catch (error) {
                console.error("Error fetching payment unpaid", error);

            }
        };
        const listAllPayment = async () => {
            try {
                const data2 = await PaymentService.getPaymentOrderByModuleIdByLearnerId(id);
                setPaymentList(data2)
            } catch (error) {
                console.log(user?.id)
                console.error("Error fetching learning module:", error);

            }
        };
        listUnpaidPayment(); // Gọi hàm để lấy dữ liệu khi component được render
        listAllPayment();
    }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'profile' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="profile-tab"
                            onClick={() => handleTabClick('profile')}
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected={activeTab === 'profile'}
                        >
                            Current Payment
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="dashboard-tab"
                            onClick={() => handleTabClick('dashboard')}
                            type="button"
                            role="tab"
                            aria-controls="dashboard"
                            aria-selected={activeTab === 'dashboard'}
                        >
                            History Payment
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'settings' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="settings-tab"
                            onClick={() => handleTabClick('settings')}
                            type="button"
                            role="tab"
                            aria-controls="settings"
                            aria-selected={activeTab === 'settings'}
                        >
                            Settings
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'contacts' ? 'border-blue-500 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                            id="contacts-tab"
                            onClick={() => handleTabClick('contacts')}
                            type="button"
                            role="tab"
                            aria-controls="contacts"
                            aria-selected={activeTab === 'contacts'}
                        >
                            Contacts
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p> */}
                    <div className="container mx-auto p-4">
                        <h1 className="text-center font-bold text-xl uppercase">Payment</h1>
                        {UnPaidPayment ? (
                            <div className="mt-8 flex gap-3 justify-center">
                                <div className="w-[500px] bg-white border rounded-lg shadow-lg px-6 py-8">
                                    <h1 className="font-bold text-2xl my-4 text-center text-blue-600">TeachMate System</h1>
                                    <hr className="mb-2" />
                                    <div className="flex justify-between mb-6">
                                        <h1 className="text-lg font-bold">Invoice</h1>
                                        <div className="text-gray-700">
                                            <div>Date: {new Date().toLocaleDateString('vi-VN', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric'
                                            })}</div>
                                            <div>Id: {UnPaidPayment?.id}</div>
                                        </div>
                                    </div>
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-bold mb-2">Bill To:</h2>
                                            <div className="text-gray-700 mb-2">{user?.displayName}</div>
                                        </div>
                                        <div className="flex items-center justify-between">

                                            <h2 className="text-lg font-bold mb-2"><strong>Class:</strong></h2>
                                            <div className="text-gray-700 mb-2">{learningModule?.title}</div>
                                        </div>
                                        <div className="flex items-center justify-between">

                                            <h2 className="text-lg font-bold mb-2">Tutor:</h2>
                                            <div className="text-gray-700 mb-2">{learningModule?.tutor?.displayName}</div>
                                        </div>
                                        <div className="flex items-center justify-between">

                                            {/* <h2 className="text-lg font-bold mb-2">Schedule:</h2>
                                    <div className="text-gray-700 mb-2">{learningModule?.moduleType !== 0 && "Custom"} Every</div> */}
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <h2 className="text-lg font-bold mb-2 mr-2">Cost:</h2>
                                            <div className="text-gray-700 mb-2">{learningModule?.price} $</div>
                                        </div>
                                        {/* <button
                                            onClick={HandlePayForClass}
                                            type="submit"
                                            className="mt-2 flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-white text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Pay now
                                        </button> */}

                                    </div>
                                    <div className="text-gray-700 mb-2">Thank you for your business!</div>
                                    <div className="text-gray-700 text-sm">Please remit payment within days.</div>
                                </div>
                                <div className="p-10 bg-white w-[300px] h-[400px] aspect-square rounded-lg shadow flex flex-col items-center justify-center gap-2 ">
                                    <p className="capitalize font-semibold self-start">Payment method</p>
                                    <p className="text-[10px] self-start text-wrap text-gray-500 pb-1">
                                        This action will take you to new page for payment
                                    </p>
                                    <label
                                        className={`inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border transition-all cursor-pointer ${selectedPayment === PaymentProviderType.ZaloPay
                                            ? 'border-indigo-500 text-indigo-900 bg-indigo-50 font-bold hover:bg-slate-200 duration-500'
                                            : 'border-transparent'
                                            }`}
                                    >
                                        <div className="inline-flex items-center justify-center gap-2 relative z-10">

                                            <img width="32"
                                                height="32" src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="" />
                                            <p
                                                className={`font-semibold absolute inset-0 w-full whitespace-nowrap ${selectedPayment === PaymentProviderType.ZaloPay
                                                    ? 'translate-y-[0%] translate-x-full top-1 left-2 opacity-100 duration-700'
                                                    : '-translate-y-[110%] translate-x-full top-1 left-2 opacity-0 duration-700'
                                                    }`}
                                            >
                                                Zalo Pay
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={PaymentProviderType.ZaloPay}
                                            className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                    <label
                                        className={`inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border transition-all cursor-pointer ${selectedPayment === PaymentProviderType.VnPay
                                            ? 'border-indigo-500 text-indigo-900 bg-indigo-50 font-bold hover:bg-slate-200 duration-500'
                                            : 'border-transparent'
                                            }`}
                                    >
                                        <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                            <img width="32"
                                                height="32" src="data:image/png;base64,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" alt="" />
                                            <p
                                                className={`font-semibold absolute inset-0 w-full whitespace-nowrap ${selectedPayment === PaymentProviderType.VnPay
                                                    ? 'translate-y-[0%] translate-x-full top-1 left-2 opacity-100 duration-700'
                                                    : '-translate-y-[110%] translate-x-full top-1 left-2 opacity-0 duration-700'
                                                    }`}
                                            >
                                                VN Pay
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={PaymentProviderType.VnPay}
                                            className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                    <label
                                        className={`inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border transition-all cursor-pointer ${selectedPayment === PaymentProviderType.Momo
                                            ? 'border-indigo-500 text-indigo-900 bg-indigo-50 font-bold hover:bg-slate-200 duration-500'
                                            : 'border-transparent'
                                            }`}
                                    >
                                        <div className="inline-flex items-center justify-center gap-2 relative z-10">
                                            <img width="32"
                                                height="32" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                                            <p
                                                className={`font-semibold absolute inset-0 w-full whitespace-nowrap ${selectedPayment === PaymentProviderType.Momo
                                                    ? 'translate-y-[0%] translate-x-full top-1 left-2 opacity-100 duration-700'
                                                    : '-translate-y-[110%] translate-x-full top-1 left-2 opacity-0 duration-700'
                                                    }`}
                                            >
                                                Momo
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={PaymentProviderType.Momo}
                                            className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                                            onChange={handleRadioChange}
                                        />
                                    </label>
                                    {/* Repeat similar structure for other payment methods */}
                                    <button className={styles.Btn} type="button" onClick={HandlePayForClass}>
                                        Pay
                                        <svg className={styles.svgIcon} viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div>Not found Order Payment</div>
                        )}


                    </div>
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <section className="container px-4 mx-auto">
                        <div className="flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-x-3">
                                                            <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                            <button className="flex items-center gap-x-2">
                                                                <span>Invoice</span>
                                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
                                                    <th scope="col" className="relative py-3.5 px-4"><span className="sr-only">Actions</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {paymentList?.map(paymentList => (
                                                    <tr key={paymentList.id}>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                                <span>{paymentList.id}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"></td>
                                                        {paymentList.paymentStatus === 1 ? <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <h2 className="text-sm font-normal">Paid</h2>
                                                            </div>
                                                        </td> : <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>

                                                                <h2 className="text-sm font-normal">Pending</h2>
                                                            </div>
                                                        </td>}

                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            <div className="flex items-center gap-x-2">
                                                                <img className="object-cover w-8 h-8 rounded-full" src={user?.avatar} alt="" />
                                                                <div>
                                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user?.displayName}</h2>
                                                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{user?.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{learningModule?.price} $</td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-6">
                                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                                    Archive
                                                                </button>
                                                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>))}
                                                {/* Repeat for other rows */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414-1.414L10.586 9l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5z" clipRule="evenodd" />
                                </svg>
                                <span>Next</span>
                            </a>
                            <div className="items-center hidden lg:flex gap-x-3">
                                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60 dark:bg-gray-800">1</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">2</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">3</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">...</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">12</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">13</a>
                                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">14</a>
                            </div>
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <span> Previous</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414L9.414 11l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </section>

                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? '' : 'hidden'}`} id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'contacts' ? '' : 'hidden'}`} id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>
        </>
    );
};

export default LearnerPayment;
