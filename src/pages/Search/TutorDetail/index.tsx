import React, { useState, useEffect } from 'react';
import { Header } from '../../../layouts';
import { useLocation } from "react-router-dom";
import { CertificateService, ReportService, SearchService, UserDetailService } from '../../../services';
import { AppUser, Certificate, LearningModule } from '../../../interfaces';
import { ModuleType, UserReportType } from '../../../common/enums';
import { Subject } from "../../../common/enums";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './TutorDetailAnimation.css';
import AOS from "aos";
import "aos/dist/aos.css";
import toast from 'react-hot-toast';


export function TutorDetail() {

    const [userData, setUserData] = useState<AppUser>();
    const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const location = useLocation();

    // Get tutorId from state
    const tutorId = location.state;
    const getModuleType = (moduleTypeCode: number): string => {
        return ModuleType[moduleTypeCode];
    };

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const data = await UserDetailService.getUserById(tutorId);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        if (tutorId) {
            fetchUserById();
        }
    }, [tutorId]);

    
    useEffect(() => {
        const fetchLearningModules = async () => {
            try {
                if (tutorId) {
                    const data = await SearchService.getAllLearningModuleOfOneTutor(tutorId);
                    setLearningModules(data);
                    setTotalPages(Math.ceil(data.length / itemsPerPage)); // Calculate total pages
                    setCurrentPage(1); // Reset to first page on data fetch
                }
            } catch (error) {
                console.error("Failed to fetch learning modules:", error);
            }
        };

        if (tutorId) {
            fetchLearningModules();
        }
    }, [tutorId]);

    const itemsPerPage = 3; // Items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentModules = learningModules.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (direction: string) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getSubjectString = (subjectCode: number): string => {
        return Subject[subjectCode];
    };

    const [showReportForm, setShowReportForm] = useState(false);

    const handleReportClick = () => {
        setShowReportForm(!showReportForm);
    };

    useEffect(() => {
        AOS.init();
        handleGetListCertificate();
    }, []);

    const [UserReportTypee, setUserReportType] = useState<UserReportType>(0);
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [listCertificate, setListCertificate] = useState<Certificate[]>([])
    const handleSentReport = async () => {
        try {
            await ReportService.sentReportuser({
                UserReportType: UserReportTypee,
                Title,
                Description,
            });

            setUserReportType(0);
            setTitle('');
            setDescription('');

            console.log('Sent repot submitted successfully!');
            toast.success('Sent report successfully');
        } catch (error) {
            console.error('Failed to sent report', error);
        }
    };

    const handleGetListCertificate = async () => {
        try {
            const data = await CertificateService.getListCertificateByTutorId(tutorId);
            setListCertificate(data)
        } catch (error) {
            console.error('Failed to load list certificate', error);
        }
    };


    return (
        <>
            {/* {loading? ( <LoadingScreen />) : ( */}
            <div data-aos="zoom-in-left" data-aos-duration="2000">


                <Header />
                {showReportForm && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                )}

                {showReportForm && (
                    <div className="report-form-container">
                        <div className="report-form" data-aos="zoom-in-right" data-aos-duration="1000">
                            <div className={`w-[500px] fixed top-20 left-[500px] bg-white p-6 md:rounded-lg shadow-xl transform transition-transform duration-300 ${showReportForm ? 'translate-x-0' : 'translate-x-full'}`}>
                                <div className="title">
                                    <h1 className="font-bold text-center">Report feature</h1>
                                </div>

                                <div className="options md:flex md:space-x-6 text-sm items-center text-gray-700 mt-4">
                                    <select className="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    >
                                        <option selected value={UserReportType.Other}>Select an option</option>

                                        <option value={UserReportType.HarassingOrBullying.toString()}> Harassing Or Bullying</option>
                                        <option value={UserReportType.ImpersonatingSomeoneElse.toString()}>Impersonating Someone Else</option>
                                        <option value={UserReportType.PostingInappropriateContent.toString()}>Posting Inappropriate Content</option>
                                    </select>
                                </div>

                                <div className="form mt-4">
                                    <div className="flex flex-col text-sm">
                                        <label htmlFor="title" className="font-bold mb-2">Title</label>
                                        <input
                                            className="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                            type="text"
                                            placeholder="Enter a title"
                                            id="title"
                                            name="title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className="text-sm flex flex-col">
                                        <label htmlFor="description" className="font-bold mt-4 mb-2">Description</label>
                                        <textarea
                                            className="appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500"
                                            placeholder="Enter your description"
                                            id="description"
                                            name="description"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="submit">
                                    <button
                                        type="button"
                                        onClick={handleSentReport}
                                        className="w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            <div className="guiding-arrow"></div>
                        </div>
                    </div>
                )}


                <div className="min-h-screen flex items-start bg-white px-4 mt-10">
                    {userData ? (
                        <div className="max-w-3xl bg-Black w-4/12 rounded-lg shadow-xl overflow-hidden ml-20 bg-gray mt-10">
                            {/* User Profile Section */}
                            <div className="p-6 text-Black text-center">
                                <div className="relative">
                                    <button
                                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none z-10"
                                        title="Report User"
                                        onClick={handleReportClick}
                                    >
                                        <i className="fas fa-flag"></i>
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold">Profile Information</h2>
                                <div className='my-5 flex items-center'>
                                    <img
                                        width={200}
                                        height={200}
                                        className='rounded-full object-cover mx-auto shadow-lg w-[200px] h-[200px] flex mx-auto'
                                        src={userData.avatar}
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                    <p className="text-gray-500 font-semibold">Full Name</p>
                                    <p className="text-gray-700 font-semibold">{userData.displayName}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                    <p className="text-gray-500 font-semibold">Phone Number</p>
                                    <p className="text-gray-700 font-semibold">{userData.phoneNumber}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 space-y-4 p-4 border-b">
                                    <p className="text-gray-500 font-semibold">Email Address</p>
                                    <p className="text-gray-700 font-semibold">{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )}


                    <div className=" max-w-6xl w-8/12 rounded-lg shadow-xl overflow-hidden mr-20 ml-8 bg-white mt-10">

                        <div className="top-0 shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            {userData && (
                                <p className="text-gray-700">
                                    {userData.tutor?.description}
                                </p>)}

                            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                            {listCertificate?.length > 0 ? (
                                listCertificate.map(certificate => (
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700 font-bold">{certificate.title}</span>
                                            <p>
                                                {/* <span className="text-gray-700 mr-2">at ABC Company</span> */}
                                                <span className="text-gray-700">{certificate.dateClaimed}</span>
                                            </p>
                                        </div>
                                        <div className='flex items-end justify-between'>
                                            <p className="mt-2">
                                                {certificate.description}
                                            </p>
                                            <a href={certificate.certificateFile} style={{ textDecoration: 'underline', position: 'relative', color: "red" }}>View here</a>
                                        </div>

                                    </div>))
                            ) : (
                                <p className="text-gray-500">No certificate.</p>
                            )}


                        </div>
                    </div>
                </div>


                {/* Learning Modules Section */}
                < div className="w-full bg-gray-100 " >
                    <div className="container mx-auto ">
                        <div className=" mx-auto w-full rounded-lg shadow-xl overflow-hidden bg-white">
                            <div className="w-full bg-gradient-to-r from-blue-500/50 to-purple-600/50 text-white text-center">
                                <h2 className="text-2xl font-bold">Learning Modules</h2>
                            </div>
                            <div className="p-6 w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-white">
                                    {currentModules.length > 0 ? (
                                        currentModules.map(module => (
                                            <div key={module.id} className="relative w-full max-w-md min-w-0 mx-auto break-words dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
                                                <div className="p-6 w-full">
                                                    <h3 className="text-lg text-indigo-500 font-bold">
                                                        {module.title}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-gray-500">Title</p>
                                                    <p className="mt-3 text-4xl font-bold text-black ">${module.price}</p>
                                                    <p className="tesxt-sm font-semibold text-gray-500">Per month</p>

                                                    <hr className="my-4" />

                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Subject: {getSubjectString(module.subject)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Grade Level:{" "}
                                                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                    {module.gradeLevel}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Start Date:{" "}
                                                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                    {module.startDate}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                End Date:{" "}
                                                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                    {module.endDate}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Max Learners:{" "}
                                                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                                                    {module.maximumLearners}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Module Type: {getModuleType(module.moduleType)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            <span className="block">
                                                                Number of Weeks:{" "}
                                                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                                    {module.numOfWeeks}
                                                                </span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-center mt-4">
                                                        <button
                                                            className="px-10 py-2 text-sm text-violet-500 bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300 flex items-center justify-center"
                                                        >
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No learning modules available.</p>
                                    )}
                                </div>
                                {/* Pagination Controls */}
                                {learningModules.length > itemsPerPage && (
                                    <div className="flex justify-center items-center gap-4 mt-8">
                                        <button
                                            className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${currentPage === 1 ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handlePageChange("prev")}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <p className="text-gray-600">
                                            Page {currentPage} of {totalPages}
                                        </p>
                                        <button
                                            className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${currentPage >= totalPages ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handlePageChange("next")}
                                            disabled={currentPage >= totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            {/* )} */}

        </>
    );
}
