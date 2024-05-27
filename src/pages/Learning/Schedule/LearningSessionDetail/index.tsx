import { LearningModule, LearningSession } from "../../../../interfaces";
import { Header } from "../../../../layouts";
import { AuthService } from "../../../../services";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ScheduleService } from "../../../../services/ScheduleService";
import { Subject } from "../../../../common/enums";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export function LearningSessionDetail() {
    const user = AuthService.getCurrentUser();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const [learningSession, setLearningSession] = useState<LearningSession>();
    const getSubjectString = (subjectCode: number | undefined): string => {
        if (subjectCode == undefined) { return "" }
        return Subject[subjectCode];
    };


    useEffect(() => {
        const viewLearningSessionDetail = async () => {
            try {
                const data = await ScheduleService.getLearningSessionById(id);
                setLearningSession(data);
            }
            catch (err) {
                console.error("viewLearningSessionDetail failed:", err);

                if (axios.isAxiosError(err)) {
                  const axiosError = err as AxiosError<any>; // Use any for generic AxiosError
          
                  if (axiosError.response) {
                    const { data } = axiosError.response;
          
                    if (data) {
                      if (data.errors) {
                        // Handle validation errors
                        Object.values(data.errors).forEach((errMsgList) => {
                          (errMsgList as string[]).forEach((errMsg: string) => {
                            toast.error(errMsg);
                          });
                        });
                      } else if (data.message) {
                        // Handle API exceptions
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

        viewLearningSessionDetail(), []
    })

    const handleParticipateLearningSession = async () => {
        try {
            if (id != null) {
                const data = await ScheduleService.participateLearningSession(id);
                window.open(data, '_blank');
            }
            
        }
        catch (err) {
            console.error("Error participating learning session:", err);

            if (axios.isAxiosError(err)) {
              const axiosError = err as AxiosError<any>; 
      
              if (axiosError.response) {
                const { data } = axiosError.response;
      
                if (data) {
                  if (data.errors) {
                    // Handle validation errors
                    Object.values(data.errors).forEach((errMsgList) => {
                      (errMsgList as string[]).forEach((errMsg: string) => {
                        toast.error(errMsg);
                      });
                    });
                  } else if (data.message) {
                    // Handle API exceptions
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
    }

    return (
        <>
            <Header />
            <div>
                <div className=" mx-auto py-2 mb-5 text-center">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Learning Session</span></h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Class: {learningSession?.learningModule.title} </p>
                </div>
                <div className="bg-white border border-gray-100 w-2/3 mx-auto p-5 rounded-md">
                    <div className="flex">
                        <div> <div className="w-20 bg-sky-100 text-sky-400 hover:text-white border border-sky-400 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-400 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-purple-400 ">
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
                            <h2 className="font-semibold font-sans text-lg">Session : {learningSession?.title}
                                <span className="bg-sky-100 py-1 px-3 rounded ml-2 text-sm">Planned</span>

                            </h2>

                            <div className="mt-3 flex text-gray-500">
                                <button type="button" className="bg-indigo-100 flex  bg-white border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
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
                                    <span>{learningSession?.date}</span>
                                </button>
                                <button type="button" className="bg-red-100 flex  bg-white border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
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
                                    <span>{learningSession?.startTime.substring(0, 5)} - {learningSession?.endTime.substring(0, 5)}</span>
                                </button>
                                <button type="button" className="bg-green-100 flex  bg-white border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <span>{learningSession?.learningModule.maximumLearners} learners</span>
                                </button>
                                <button type="button" className="bg-yellow-100 flex  bg-white border border-white focus:outline-none hover:bg-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-0.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <span>{getSubjectString(learningSession?.learningModule.subject)}</span>
                                </button>
                            </div>

                        </div>


                    </div>
                        <div className="flex justify-end">
                            <button type="button" className="flex  mt-5 text-white bg-sky-500 hover:bg-white hover:border hover:border-sky-500 hover:text-sky-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleParticipateLearningSession}>
                                <svg fill="currentColor" stroke="currentColor" className="w-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
                                    <style>{`.st0{stroke:#ffffff;stroke-width:0.05;stroke-miterlimit:10;}`}</style>
                                    <g id="grid_system"></g>
                                    <g id="_icons">
                                        <path className="st0" d="M20.8,7.3C20,6.8,19,6.6,18.1,6.9l-2.3,0.8C15.2,6.1,13.7,5,12,5H6C3.8,5,2,6.8,2,9v6c0,2.2,1.8,4,4,4h6c1.7,0,3.2-1.1,3.8-2.7l2.3,0.8c0.3,0.1,0.6,0.2,1,0.2c0.6,0,1.2-0.2,1.7-0.6c0.8-0.6,1.2-1.5,1.2-2.4V9.8C22,8.8,21.5,7.9,20.8,7.3z M12,17H6c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2v6C14,16.1,13.1,17,12,17z M20,14.2c0,0.3-0.2,0.6-0.4,0.8c-0.3,0.2-0.6,0.2-0.9,0.1L16,14.3V9.7l2.7-0.9C19,8.7,19.3,8.8,19.6,9C19.8,9.2,20,9.4,20,9.8V14.2z" fill="currentColor" />
                                    </g>
                                </svg>
                                Join the session</button>
                        </div>
                </div>
                <div className="bg-white border border-gray-100 w-2/3 mx-auto my-5 p-5 rounded-md">
                    <h2 className="font-semibold font-sans text-lg">Question after this learning session:
                        <span className="bg-sky-100 py-1 px-3 rounded ml-2 text-md">Why do we should learn IT? Answer 3 different questions</span>

                    </h2>
                    <textarea id="message" rows={4} className="mt-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    <button type="button" className="flex  mt-5 text-white bg-sky-500 hover:bg-white hover:border hover:border-sky-500 hover:text-sky-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                        Submit</button>
                    <h2 className="mt-5 font-semibold font-sans text-lg">Feedback for this learning session:

                    </h2>
                    <p className="font-semibold  py-2 px-3 rounded mt-2 text-sm">What do you think about this lesson? Give your tutor a feedback for improvement</p>
                    
                    <div className="flex ">
                    <button type="button" className="text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5Z" fill="#0F0F0F"></path> <path d="M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z" fill="#0F0F0F"></path> <path d="M14.4338 15.1987C13.8713 15.0112 13.0567 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13L12.0946 13C13.0217 12.9996 14.1598 12.9992 15.0662 13.3013C15.5636 13.4671 16.0695 13.7463 16.4456 14.2298C16.8284 14.722 17 15.3271 17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.6729 14.9216 15.528 14.8669 15.4577C14.8055 15.3787 14.6864 15.2829 14.4338 15.1987Z" fill="#0F0F0F"></path> <path d="M8.5 12C8 12 7 14 7 14.5C7 15 7.5 16 8.5 16C9.5 16 10 15 10 14.5C10 14 9 12 8.5 12Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#0F0F0F"></path> </g></svg>

                            Terrible
                        </button>
                        <button type="button" className="text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#0F0F0F"></path> <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" fill="#0F0F0F"></path> <path d="M15.1091 16.4588C15.3597 16.9443 15.9548 17.1395 16.4449 16.8944C16.9388 16.6474 17.1391 16.0468 16.8921 15.5528C16.8096 15.3884 16.7046 15.2343 16.5945 15.0875C16.4117 14.8438 16.1358 14.5299 15.7473 14.2191C14.9578 13.5875 13.7406 13 11.9977 13C10.2547 13 9.03749 13.5875 8.24796 14.2191C7.85954 14.5299 7.58359 14.8438 7.40078 15.0875C7.29028 15.2348 7.1898 15.3889 7.10376 15.5517C6.85913 16.0392 7.06265 16.6505 7.55044 16.8944C8.04053 17.1395 8.63565 16.9443 8.88619 16.4588C8.9 16.4339 9.08816 16.1082 9.49735 15.7809C9.95782 15.4125 10.7406 15 11.9977 15C13.2547 15 14.0375 15.4125 14.498 15.7809C14.9072 16.1082 15.0953 16.4339 15.1091 16.4588Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"></path> </g></svg>

                            Bad
                        </button>
                        <button type="button" className="text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#0F0F0F"></path> <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" fill="#0F0F0F"></path> <path d="M8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16H15.9991C16.5514 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14H8Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"></path> </g></svg>

                            Okay
                        </button>
                        <button type="button" className="text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#0F0F0F"></path> <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" fill="#0F0F0F"></path> <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"></path> </g></svg>
                            Good
                        </button>
                        <button type="button" className="text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.70504 10.7092C6.8501 10.5689 7.01205 10.4438 7.1797 10.3321C7.50489 10.1153 7.80058 10 8 10C8.19942 10 8.49511 10.1153 8.8203 10.3321C9.07494 10.5018 9.26866 10.6837 9.2931 10.7074C9.68451 11.0859 10.3173 11.0969 10.7071 10.7071C11.0976 10.3166 11.0976 9.68342 10.7071 9.29289C10.4723 9.05848 10.2052 8.85164 9.9297 8.66795C9.50489 8.38475 8.80058 8 8 8C7.19942 8 6.49511 8.38475 6.0703 8.66795C5.79505 8.85145 5.52844 9.05816 5.29363 9.29216C4.90926 9.67754 4.90613 10.3203 5.29289 10.7071C5.68258 11.0968 6.31431 11.0972 6.70504 10.7092Z" fill="#0F0F0F"></path> <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" fill="#0F0F0F"></path> <path d="M14.705 10.7092C14.8501 10.5689 15.0121 10.4438 15.1797 10.3321C15.5049 10.1153 15.8006 10 16 10C16.1994 10 16.4951 10.1153 16.8203 10.3321C17.0749 10.5018 17.2687 10.6837 17.2931 10.7074C17.6845 11.0859 18.3173 11.0969 18.7071 10.7071C19.0976 10.3166 19.0976 9.68342 18.7071 9.29289C18.4723 9.05848 18.2052 8.85164 17.9297 8.66795C17.5049 8.38475 16.8006 8 16 8C15.1994 8 14.4951 8.38475 14.0703 8.66795C13.795 8.85145 13.5284 9.05816 13.2936 9.29216C12.9093 9.67754 12.9061 10.3203 13.2929 10.7071C13.6826 11.0968 14.3143 11.0972 14.705 10.7092Z" fill="#0F0F0F"></path> </g></svg>
                            Amazing
                        </button>
                        
                        
                    </div>
                </div>
            </div>

        </>
    );
}
