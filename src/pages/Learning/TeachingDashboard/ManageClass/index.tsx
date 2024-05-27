import { useState, useEffect } from 'react';
import { Header } from "../../../../layouts";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LearningModuleDetail } from '../../LearningModuleDetail';
import { ViewClassSchedule } from '../../LearningModuleDetail/ui/ClassSchedule';
import { ListRequestsForClass } from '../../LearningModuleRequest';
import { LearnersInClass } from '../ListLearners';
import { ReceiveFeedback } from '../../../Feedback';
import { useSearchParams } from 'react-router-dom';
import { Step } from '../../../Payment/Step';
import { ListMaterial } from '../../../StudyMaterial';

export function ManageClass() {
    const [selectedTab, setSelectedTab] = useState<string>('tutor');
    useEffect(() => {
        AOS.init();
        handleTabClick(section || 'tutor')
    }, []);
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const section = searchParams.get("section")
    return (
        <>
            <div data-aos="zoom-in-left" data-aos-duration="1000">
                <Header />
                <div className="md:flex w-5/6 mx-auto mt-5">
                    <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('tutor')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'tutor' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg active w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                aria-current={selectedTab === 'tutor' ? 'page' : undefined}
                            >
                                <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                Info
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('class')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'class' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                                Schedule
                            </a>
                        </li>
                        <li>
                            <a
                                // href={"/material?id=" + id}
                                onClick={() => handleTabClick('material')}
                                
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'material' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5 0h-11c-1.104 0-2 0.895-2 2v28c0 1.105 0.896 2 2 2h19c1.105 0 2-0.895 2-2v-20zM25.5 10.829v0.171h-9v-9h0.172zM6.5 30v-28h8v11h11v17h-19z"></path> </g></svg>
                                Material
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('settings')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'settings' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                </svg>
                                Request
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('contact')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'contact' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >

                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path d="M473.61,63.16L276.16,2.927C269.788,0.986,263.004,0,256.001,0c-7.005,0-13.789,0.986-20.161,2.927 L38.386,63.16c-3.457,1.064-5.689,3.509-5.689,6.25c0,2.74,2.232,5.186,5.691,6.25l91.401,27.88v77.228 c0.023,39.93,13.598,78.284,38.224,107.981c11.834,14.254,25.454,25.574,40.483,33.633c15.941,8.564,32.469,12.904,49.124,12.904 c16.646,0,33.176-4.34,49.126-12.904c22.597-12.143,42.04-31.646,56.226-56.39c14.699-25.683,22.471-55.155,22.478-85.224v-78.214 l45.244-13.804v64.192c-6.2,0.784-11.007,6.095-11.007,12.5c0,5.574,3.649,10.404,8.872,12.011l-9.596,63.315 c-0.235,1.576,0.223,3.168,1.262,4.386c1.042,1.204,2.554,1.902,4.148,1.902h36.273c1.592,0,3.104-0.699,4.148-1.91 c1.036-1.203,1.496-2.803,1.262-4.386l-9.596-63.307c5.223-1.607,8.872-6.436,8.872-12.011c0-6.405-4.81-11.716-11.011-12.5V81.544 l19.292-5.885c3.457-1.064,5.691-3.517,5.691-6.25C479.303,66.677,477.069,64.223,473.61,63.16z M257.62,297.871 c-10.413,0-20.994-2.842-31.448-8.455c-16.194-8.649-30.908-23.564-41.438-42.011c-4.854-8.478-8.796-17.702-11.729-27.445 c60.877-10.776,98.51-49.379,119.739-80.97c10.242,20.776,27.661,46.754,54.227,58.648c-3.121,24.984-13.228,48.812-28.532,67.212 c-8.616,10.404-18.773,18.898-29.375,24.573C278.606,295.029,268.025,297.871,257.62,297.871z"></path> <path d="M373.786,314.23l-1.004-0.629l-110.533,97.274L151.714,313.6l-1.004,0.629 c-36.853,23.036-76.02,85.652-76.02,156.326v0.955l0.846,0.45C76.291,472.365,152.428,512,262.249,512 c109.819,0,185.958-39.635,186.712-40.038l0.846-0.45v-0.955C449.808,399.881,410.639,337.265,373.786,314.23z"></path> </g> </g></svg>
                                Feedback
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('learner')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'learner' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                    <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                                </svg>
                                Learners
                            </a>
                        </li>
                        {/* <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick('payment')}
                                className={`inline-flex items-center px-4 py-3 ${selectedTab === 'payment' ? 'text-white bg-blue-700' : 'bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300'} rounded-lg w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                                    <path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V192H0V96zM0 320V224H576V320H0zm0 32H576v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V352z" />
                                </svg>
                                Payment
                            </a>
                        </li> */}
                    </ul>
                    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">

                        {selectedTab === 'tutor' && (
                            <LearningModuleDetail />
                        )}
                        {selectedTab === 'class' && (
                            <ViewClassSchedule />
                        )}
                        {selectedTab === 'settings' && (
                            <ListRequestsForClass />
                        )}
                        {selectedTab === 'contact' && (
                            <ReceiveFeedback />
                        )}
                        {selectedTab === 'learner' && (
                            <LearnersInClass />
                        )}
                        {selectedTab === 'material' && (
                            <ListMaterial />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}