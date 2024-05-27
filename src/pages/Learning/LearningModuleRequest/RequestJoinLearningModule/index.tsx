
import { ModuleType, Subject } from "../../../../common/enums";
import { Header } from "../../../../layouts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { LearningModuleService } from "../../../../services/LearningModuleService";
import { LearningModule } from "../../../../interfaces";
import toast from "react-hot-toast";
import axios from "axios";
import { AxiosError } from "axios";

export function RequestJoinLearningModule() {
    const [title, setTitle] = useState<string>("");
    const location = useLocation();
    const { id } = location.state || {};
    const learningModuleId = id;
    const [learningModule, setLearningModule] = useState<LearningModule>();
    const getSubjectString = (subjectCode: number): string => {
        return Subject[subjectCode];
      };
      
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        const fetchLearningModule = async () => {
            try {
                if (id) {
                    const module = await LearningModuleService.getLearningModuleById(id);
                    setLearningModule(module);
                }
            } catch (err) {
               
                
                console.error('Error fetching learning module:', err);

             
            }
        };

        fetchLearningModule();
    }, []);

    const handleCreateLearningModuleRequest = async () => {

        try {
          
          const learningModuleRequest = await LearningModuleService.createLearningModuleRequest({
            title,
            learningModuleId
          });
         navigate('/learning');
        } catch (err) {
          
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<any>;
                if (axiosError.response) {
                    const { data } = axiosError.response;
                    if (data) {
                        if (data.errors) {
                            Object.values(data.errors).forEach((errMsgList) => {
                                (errMsgList as string[]).forEach((errMsg: string) => {
                                    toast.error(errMsg);
                                });
                            });
                        } else if (data.message) {
                            toast.error(data.message);
                        }
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
        <>
            <Header />

            <section className="bg-white dark:bg-gray-900">
                <div className="bg-white border border-gray-100 w-2/3 mx-auto p-5 rounded-md">
                    <div className="flex">
                        <div>
                            <div className="w-20 bg-sky-100 text-sky-400 hover:text-white border border-sky-400 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-400 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-purple-400 ">
                                <svg className="p-2" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <defs>
                                            <style>{`.cls-1{fill-rule:evenodd}`}

                                            </style>
                                        </defs>
                                        <path d="M53.11 141.57a5.8 5.8 0 0 1 8.2-.3l6.69 6.26a5.81 5.81 0 0 1-7.91 8.47l-6.69-6.24a5.82 5.82 0 0 1-.29-8.19Zm86.13 0a5.8 5.8 0 0 0-8.2-.3l-6.69 6.25a5.81 5.81 0 0 0 7.91 8.51l6.69-6.24a5.82 5.82 0 0 0 .29-8.22Z" className="cls-1"></path>
                                        <path d="M163.29 63.1 141 68.64v-19a15.12 15.12 0 0 0-21-13.94Q102.8 43 96.35 43t-24-7.42a15.12 15.12 0 0 0-21 13.93v19.2L28.71 63.1a5.31 5.31 0 0 0-6.59 5.52 40.62 40.62 0 0 0 30 36.21 44.86 44.86 0 0 0 88.11-.1 40.63 40.63 0 0 0 29.64-36.11 5.31 5.31 0 0 0-6.58-5.52Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd"></path>
                                        <rect width="11.61" height="18.56" x="70.31" y="63.64" rx="5.81"></rect>
                                        <rect width="11.61" height="18.56" x="110.07" y="63.64" rx="5.81"></rect>
                                        <path d="M87.46 85.69a9 9 0 0 1 9.13-7.07 8.88 8.88 0 0 1 8.65 7.07V86c0 .26-.08.36-.32.33l-8.32 1.51h-.49l-8.33-1.49c-.23 0-.32-.08-.32-.33Z"></path>
                                        <path d="M96.42 89.66h-.49l-6-1.07v.55a6.44 6.44 0 0 0 12.88 0v-.61Z" className="cls-1"></path>
                                    </g>
                                </svg>
                            </div></div>


                        <div className="w-5/6 ml-3">
                            <h2 className="font-semibold font-sans text-lg">
                                Class : {learningModule?.title}
                                <span className="bg-sky-100 py-1 px-3 rounded ml-2 text-sm">Planned</span>

                            </h2>

                            <div className="mt-3 flex text-gray-500">
                                <button type="button" className="bg-indigo-100 flex border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg className="w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z" fill="#1C274C"></path>
                                            <path opacity="0.5" d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z" fill="#1C274C"></path>
                                            <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path>
                                            <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path>
                                            <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path>
                                            <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path>
                                            <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path>
                                            <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path>
                                        </g>
                                    </svg>
                                    <span>{learningModule?.startDate}</span>
                                </button>
                                <button type="button" className="bg-indigo-100 flex  border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg className="w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z" fill="#1C274C"></path>
                                            <path opacity="0.5" d="M21.9995 14.0001V12.0001C21.9995 11.161 21.9963 9.66527 21.9834 9H2.00917C1.99626 9.66527 1.99953 11.161 1.99953 12.0001V14.0001C1.99953 17.7713 1.99953 19.6569 3.1711 20.8285C4.34267 22.0001 6.22829 22.0001 9.99953 22.0001H13.9995C17.7708 22.0001 19.6564 22.0001 20.828 20.8285C21.9995 19.6569 21.9995 17.7713 21.9995 14.0001Z" fill="#1C274C"></path>
                                            <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path>
                                            <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path>
                                            <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path>
                                            <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path>
                                            <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path>
                                            <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path>
                                        </g>
                                    </svg>
                                    <span>{learningModule?.endDate}</span>
                                </button>
                                <button type="button" className="bg-red-100 flex  border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg className="w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                opacity="0.5"
                                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                fill="#1C274C"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                                                fill="#1C274C"
                                            ></path>
                                        </g>
                                    </svg>
                                    <span> {learningModule?.duration} minutes </span>
                                </button>
                                <button type="button" className="bg-green-100 flex  border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <span>{learningModule?.maximumLearners} learners</span>
                                </button>
                                <button type="button" className="bg-yellow-100 flex   border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <span>{getSubjectString(learningModule?.subject || 0)}</span>
                                </button>
                            </div>

                        </div>


                    </div>
                   
                </div>
                
                <div className="py-3 px-4 mx-auto max-w-2xl lg:py-5">
                    <div className=" mx-auto py-2 mb-5">
                        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Request join class</span></h1>
                        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">What do you request</p>
                    </div>

                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="title" id="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type request title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                <p className="mx-auto text-center text-red-300">{message}</p>

                            </div>
                            
                            <div className="mt-8">

                                <button
                                    type="button"
                                    onClick={handleCreateLearningModuleRequest}
                                    className="text-white bg-gradient-to-r to-indigo-600 from-sky-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    Send</button>
                            </div>
                        </div>
                    </form>
                </div >
            </section >

        </>
    );
}
