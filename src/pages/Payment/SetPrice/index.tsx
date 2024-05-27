import React, { useState, useEffect } from 'react';
import { PaymentService } from '../../../services';
import toast from 'react-hot-toast';
import { PaymentType } from '../../../common/enums/Payment';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Header } from '../../../layouts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Step from '../Step';


export function SetPrice() {
    const [price, setPrice] = useState<number>(0);
    const navigate = useNavigate();
    const [paymentType, setPaymentType] = useState<PaymentType>(0);
    const [searchParams] = useSearchParams();
    const learningModuleId = searchParams.get("id")
    const handleSetPrice = async () => {
        try {
            console.log('Attempting to set price with values:', { price, paymentType, learningModuleId });
            await PaymentService.setPriceForLearningModule({ price, paymentType, learningModuleId: Number.parseInt(learningModuleId || "") });
            console.log('Set price successfully!');
            toast.success('Set price successfully');
            navigate("/payment/add-account-info?id="+learningModuleId);

            // navigate("/manage-class?section=tutor&id=" + learningModuleId);
        } catch (error) {
            console.error('Failed to set price', error);
            toast.error('Failed to set price');
        }
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <div data-aos="zoom-in-left" data-aos-duration="1000">
                <Header />
                <Step currentStep={2} />
                <div className="relative py-10 sm:max-w-xl sm:mx-auto animate__animated animate__fadeInUp">
                    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl text-gray-800 font-semibold">Set Your Pricing</h2>
                        </div>
                        <form className="space-y-6">
                            <div className="animate__animated animate__fadeInLeft">
                                <label htmlFor="pricing_model" className="block text-sm font-medium text-gray-700">
                                    Pricing Model
                                </label>
                                <select
                                    id="pricing_model"
                                    name="pricing_model"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(Number.parseInt(e.target.value))}
                                    required
                                >
                                    <option value={PaymentType.Session}>Per Session</option>
                                    <option value={PaymentType.Weekly}>Per Weekly</option>
                                    <option value={PaymentType.Monthly}>Per Monthly</option>
                                </select>
                            </div>

                            <div className="animate__animated animate__fadeInRight">
                                <label htmlFor="base_price" className="block text-sm font-medium text-gray-700">
                                    Base Price
                                </label>
                                <input
                                    type="number"
                                    id="base_price"
                                    name="base_price"
                                    className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="$"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="animate__animated animate__fadeInUp">
                                <label htmlFor="discounts" className="block text-sm font-medium text-gray-700">
                                    Discounts (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="discounts"
                                    name="discounts"
                                    className="mt-1 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="e.g., 10% off for early sign-ups"
                                />
                            </div>

                            <div className="flex items-start animate__animated animate__fadeInUp">
                                <div className="flex items-center h-5">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletter" className="text-gray-500">
                                        I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div className="animate__animated animate__zoomIn">
                                <button
                                    onClick={handleSetPrice}
                                    type="button"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetPrice;
