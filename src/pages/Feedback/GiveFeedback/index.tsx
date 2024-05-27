import React, { useEffect, useState } from 'react';
import { FeedbackService } from '../../../services';
import { useSearchParams } from 'react-router-dom'; //useSearchParams cho phép bạn dễ dàng lấy và cập nhật các tham số truy vấn 
//(query parameters) từ URL của trang web
// import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';
// import { useNavigate } from "react-router-dom";
import { ReceiveFeedback } from '../ReceiveFeedback';


export const GiveFeedback = () => {
    const [comment, setComment] = useState('');
    const [star, setStar] = useState(0);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const learningModuleId = Number.parseInt(id || "0");
    // const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await FeedbackService.givefeedback({
                comment,
                star,
                learningModuleId: Number(learningModuleId),
                isAnonymous,
            });

            // Optionally, reset form fields after successful submission
            setComment('');
            setStar(0);
            setIsAnonymous(true);
            // navigate('./enroll-class?id=1&section=feedbackOk');

            console.log('Feedback submitted successfully!');
            toast.success('Send feedback successfully');
        } catch (error) {
            console.error('Failed to submit feedback', error);
        }
    };

    const handleStarChange = (index: number) => {
        setStar(index); // Update state when a star is clicked
    };

    const [hasFeedback, setHasFeedback] = useState<boolean>(false);

    const handleHasFeedback = async () => {
        try {
            if (id != null) {
                const data = await FeedbackService.hasFeedback(id);
                setHasFeedback(data)
            }
        }
        catch (err) {
            console.log("Error has feedback" + err);
        }
    }

    useEffect(() => {
        handleHasFeedback();
    });

    return (

        <div className="max-w-7xl dark:bg-gray-950 dark:text-white">
            {!hasFeedback && (
                <form className="w-full p-4 rounded shadow-md" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <h2 className="text-xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">
                        <span className="bg-gradient-to-r to-indigo-600 from-sky-400 bg-clip-text text-transparent font-bold">
                            Give feedback
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="mb-4 col-span-1 md:col-span-3">
                            <textarea
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                                placeholder="Comment...*"
                                rows={5}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4 col-span-1 md:col-span-3">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 cursor-pointer ${index < star ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                        onClick={() => handleStarChange(index + 1)}
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}

                                <label htmlFor="isAnonymous" className="text-gray-700 dark:text-gray-300 ml-5">
                                    <input
                                        type="checkbox"
                                        id="isAnonymous"
                                        name="isAnonymous"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                        className="mr-2 leading-tight"
                                    />
                                    Anonymous
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="py-4 px-6 bg-blue-950 text-white rounded-sm bg-gradient-to-r to-indigo-600 from-sky-400"
                        >
                            Post Comment →
                        </button>
                    </div>
                </form>

            )}

            <ReceiveFeedback />
        </div>
    );
};
