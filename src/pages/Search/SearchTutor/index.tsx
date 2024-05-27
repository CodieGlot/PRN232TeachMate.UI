import React, { useState, useEffect } from "react";
// import { Header } from "../../../layouts";
import { AppUser } from "../../../interfaces";
import { SearchService } from "../../../services";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
// import { LearningModule } from "../../../interfaces";
// import { useLocation } from "react-router-dom";


interface SearchTutorProps {
  searchQuery: string | undefined; // Allow undefined in case it's not provided
}

export function SearchTutor({ searchQuery }: SearchTutorProps) {
  const navigate = useNavigate();
  const handletutordetail = async (id: string) => {
    console.log("Tutor ID:", id);
    navigate("/tutordetail", { state: id });
  }
  const [message, setMessage] = useState<string | null>("");

  const [displayName, setDisplayName] = useState<string>(searchQuery || "");
  const [tutors, setTutors] = useState<AppUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionsPerPage = 3;
  const totalPages = Math.ceil(tutors.length / sectionsPerPage);
  useEffect(() => {  // hàm này luôn chạy khi điều kiện dưới thay đổi
    if (searchQuery) {
      setDisplayName(searchQuery || "");
    }
  }, [searchQuery]);
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await SearchService.searchTutor({ displayName });
        setTutors(data);
        if (data.length == 0) setMessage("Tutors not found"); else setMessage(null);
        if (currentPage > totalPages) setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, [displayName]); // Fetch tutors whenever displayName changes


  const indexOfLastTutor = currentPage * sectionsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - sectionsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  useEffect(() => {
    AOS.init();
  }, []);


  // // getAverageRatingForTutor
  // const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
  // const location = useLocation();

  // // Get tutorId from state
  // const tutorId = location.state;

  // useEffect(() => {
  //   const fetchLearningModules = async () => {
  //     try {
  //       if (tutorId) {
  //         const data = await SearchService.getAverageRatingOfTutorByAllLearningModule(tutorId);
  //         setLearningModules(data);

  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch learning modules:", error);
  //     }
  //   };

  //   if (tutorId) {
  //     fetchLearningModules();
  //   }
  // }, [tutorId]);


  return (
    <>
      <a href="#" className="block bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent text-4xl font-bold" style={{ marginLeft: '10px' }}>
        Teach Mate
      </a>
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-0"></div>
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <div className="container mx-auto my-20 w-2/3">
          <form className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none mb-8">
            <div className="relative w-full flex rounded-lg overflow-hidden bg-gradient-to-r from-sky-400 to-indigo-600/30 p-0.5 shadow-lg">
              <input
                type="search"
                className="block w-full p-2.5 text-sm text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Tutor ..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}  // onchange thì khi nào input thay đổi thì hàm này chạy để make new data
                required
              />
              <button
                type="submit"
                className="p-2.5 text-sm font-medium text-violet-400 bg-white border-solid border-2 border-violet-200 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-30"
                style={{ backgroundColor: 'bg-violet-400' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19L13.65 13.65M11 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
          <p className="mx-auto text-center">{message}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {currentTutors.map((tutor, index) => (
              <div
                key={index}
                className="my-10 relative w-full group max-w-md min-w-0 mx-auto break-words bg-white border shadow-2xl dark:bg-white-800 dark:border-white-700 rounded-xl"
              >
                <div className="pb-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="flex justify-center w-full">
                      <div className="relative">
                        <img
                          src={tutor.avatar}
                          className="object-cover dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px] max-h-[150px]"
                          alt={tutor.displayName}
                          style={{ aspectRatio: '1 / 1' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mt-20 text-center">
                    <h3 className="text-lg text-indigo-500 font-bold">
                      {tutor.displayName}
                    </h3>
                    <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="text-xs font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                        {tutor.email}
                      </div>
                    </div>
                    <div className="w-full text-center">
                      <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Toggle Details Button */}
                    <button
                      onClick={() => handletutordetail(tutor.id)}
                      className="mt-4 px-4 py-2 text-sm text-violet-500 bg-gradient-to-r to-indigo-600/20 from-sky-400/20 rounded hover:bg-violet-300"
                    >
                      Show Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevPage}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}