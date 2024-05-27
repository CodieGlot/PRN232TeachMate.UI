import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Header } from '../../layouts';

export const Forum = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    // State to manage current page number
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust this based on your actual items per page
    const totalItems = 100; // Example total number of items in your data

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Example function to handle moving to previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Example function to handle moving to next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };


    return (
        <>
            <Header />
            <div data-aos="zoom-in-left" data-aos-duration="1000">
                <div className="overflow-x-hidden bg-gray-100">

                    <div className="px-6 py-8 bg-gradient-to-r to-indigo-600/20 from-sky-400/20">
                        <div className="container flex justify-between mx-auto">
                            <div className="w-full lg:w-8/12">
                                <div className="flex items-center justify-between">
                                </div>
                                <div className="mt-6">
                                    <div className="max-w-2xl mx-auto px-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-lg lg:text-2xl text-xl font-bold text-gray-700">Start Discussion</h2>
                                        </div>
                                        <form className="mb-6">
                                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                <textarea
                                                    id="comment"

                                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                    placeholder="Write a comment..."
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gradient-to-r to-indigo-600 from-sky-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                            >
                                                Post comment
                                            </button>
                                        </form>

                                        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                        <img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                            alt="Michael Gough"
                                                        />
                                                        Michael Gough
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <time dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
                                                    </p>
                                                </div>
                                                <button
                                                    id="dropdownComment1Button"
                                                    data-dropdown-toggle="dropdownComment1"
                                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                    type="button"
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                    <span className="sr-only">Comment settings</span>
                                                </button>
                                                <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownComment1Button">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.
                                            </p>
                                            <div className="flex items-center mt-4 space-x-4">
                                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </article>

                                        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                        <img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                            alt="Jese Leos"
                                                        />
                                                        Jese Leos
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <time dateTime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time>
                                                    </p>
                                                </div>
                                                <button
                                                    id="dropdownComment2Button"
                                                    data-dropdown-toggle="dropdownComment2"
                                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                    type="button"
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                    <span className="sr-only">Comment settings</span>
                                                </button>
                                                <div id="dropdownComment2" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownComment2Button">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Much appreciated! Glad you liked it ☺️
                                            </p>
                                            <div className="flex items-center mt-4 space-x-4">
                                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </article>
                                        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                        <img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                            alt="Michael Gough"
                                                        />
                                                        Michael Gough
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <time dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
                                                    </p>
                                                </div>
                                                <button
                                                    id="dropdownComment1Button"
                                                    data-dropdown-toggle="dropdownComment1"
                                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                    type="button"
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                    <span className="sr-only">Comment settings</span>
                                                </button>
                                                <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownComment1Button">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.
                                            </p>
                                            <div className="flex items-center mt-4 space-x-4">
                                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </article>

                                        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                        <img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                            alt="Jese Leos"
                                                        />
                                                        Jese Leos
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <time dateTime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time>
                                                    </p>
                                                </div>
                                                <button
                                                    id="dropdownComment2Button"
                                                    data-dropdown-toggle="dropdownComment2"
                                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                    type="button"
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                    <span className="sr-only">Comment settings</span>
                                                </button>
                                                <div id="dropdownComment2" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownComment2Button">
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Much appreciated! Glad you liked it ☺️
                                            </p>
                                            <div className="flex items-center mt-4 space-x-4">
                                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-4 mt-8">
                                    <button
                                        onClick={goToPreviousPage}
                                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <p className="text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </p>
                                    <button
                                        onClick={goToNextPage}
                                        className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="hidden w-4/12 -mx-8 lg:block">
                                <div className="px-8">
                                    <h1 className="mb-4 text-xl font-bold text-gray-700">Top User of the Week</h1>
                                    <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                                        <ul className="-mx-4">
                                            <li className="flex items-center"><img src="image.jpg" alt="Description" />
                                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Alex John</a><span
                                                    className="text-sm font-light text-gray-700">Created 23 Posts</span></p>
                                            </li>
                                            <li className="flex items-center mt-6"><img src="image.jpg" alt="Description" />
                                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Jane Doe</a><span
                                                    className="text-sm font-light text-gray-700">Created 52 Posts</span></p>
                                            </li>
                                            <li className="flex items-center mt-6"><img src="image.jpg" alt="Description" />
                                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Lisa Way</a><span
                                                    className="text-sm font-light text-gray-700">Created 73 Posts</span></p>
                                            </li>
                                            <li className="flex items-center mt-6"><img src="image.jpg" alt="Description" />
                                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Steve Matt</a><span
                                                    className="text-sm font-light text-gray-700">Created 245 Posts</span></p>
                                            </li>
                                            <li className="flex items-center mt-6"><img src="image.jpg" alt="Description" />
                                                <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Khatab
                                                    Wedaa</a><span className="text-sm font-light text-gray-700">Created 332 Posts</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="px-8 mt-10">
                                    <h1 className="mb-4 text-xl font-bold text-gray-700">Related Topics</h1>
                                    <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                                        <ul>
                                            <li><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                                AWS</a></li>
                                            <li className="mt-2"><a href="#"
                                                className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                                Laravel</a></li>
                                            <li className="mt-2"><a href="#"
                                                className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- Vue</a>
                                            </li>
                                            <li className="mt-2"><a href="#"
                                                className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                                Design</a></li>
                                            <li className="flex items-center mt-2"><a href="#"
                                                className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                                Django</a></li>
                                            <li className="flex items-center mt-2"><a href="#"
                                                className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- PHP</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="px-8 mt-10">
                                    <h1 className="mb-4 text-xl font-bold text-gray-700">Hot Network Questions</h1>
                                    <div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
                                        <div className="mt-4"><a href="#" className="text-lg font-medium text-gray-700 hover:underline">Build
                                            Your New Idea with Laravel Freamwork.</a></div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center"><img src="image.jpg" alt="Description" /><a href="#"
                                                className="mx-3 text-sm text-gray-700 hover:underline">Alex John</a></div><span
                                                    className="text-sm font-light text-gray-600">Jun 1, 2020</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="px-6 py-2 text-gray-100 bg-gray-800">
                        <div className="container flex flex-col items-center justify-between mx-auto md:flex-row"><a href="#"
                            className="text-2xl font-bold">Brand</a>
                            <p className="mt-2 md:mt-0">All rights reserved 2024.</p>
                            <div className="flex mt-4 mb-2 -mx-2 md:mt-0 md:mb-0"><a href="#"
                                className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                                    className="w-4 h-4 fill-current">
                                    <path
                                        d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z">
                                    </path>
                                </svg></a><a href="#" className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                                    className="w-4 h-4 fill-current">
                                    <path
                                        d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z">
                                    </path>
                                </svg></a><a href="#" className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                                    className="w-4 h-4 fill-current">
                                    <path
                                        d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z">
                                    </path>
                                </svg></a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};
