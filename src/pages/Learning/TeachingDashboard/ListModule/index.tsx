import { Subject, UserRole } from "../../../../common/enums";
import { LearningModule } from "../../../../interfaces/Learning/LearningModule";
import { Header } from "../../../../layouts";
import { LearningModuleService } from "../../../../services/LearningModuleService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthService } from "../../../../services";
import {
  Menu, 
  MenuButton, 
  MenuItem,
  MenuItems, 
  Transition, 
} from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

export function ListModule() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [list, setList] = useState<LearningModule[]>([]);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
// sort
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3); // Adjust as needed
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages

  //write tạm ở đây
  const getSubjectString = (subjectCode: number): string => {
    return Subject[subjectCode];
  };

  const viewLearningModuleDetail = async (id: string) => {
    try {
      if (user?.userRole == UserRole.TUTOR) {
        navigate("/manage-class?id=" + id,)
      }
      else if (user?.userRole == UserRole.LEARNER) {
        navigate("/enroll-class?id=" + id,)
      }

    } catch (error) {
      console.error("Error fetching learning module:", error);

    }
  }


  const fetchLearningModules = async () => {
    try {
      if (user?.userRole == UserRole.TUTOR) {
        const data = await LearningModuleService.getAllCreatedLearningModule();
        setList(data);
        setTotalPages(Math.ceil(data.length / perPage));
      }// Cập nhật state list với dữ liệu từ API

      if (user?.userRole == UserRole.LEARNER) {
        const data = await LearningModuleService.getAllEnrolledLearningModule();
        setList(data);
        setTotalPages(Math.ceil(data.length / perPage));
      }

    } catch (error) {
      console.error("Error fetching learning modules:", error);
    }
  };
  useEffect(() => {
    fetchLearningModules(); // Gọi hàm để lấy dữ liệu khi component được render
  }, [currentPage, perPage]); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 focus:opacity-[0.85] focus:shadow-none ${currentPage === i
              ? 'bg-sky-400 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] active:shadow-none'
              : 'text-gray-900'
            }`}
          onClick={() => handlePageClick(i)}
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{i}</span>
        </button>
      );
    }
    return pages;
  };
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentList = list.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <Header />
        
        <section className="learning-module">
          <div className="w-1/2 mx-auto">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400"> {user?.userRole == UserRole.TUTOR ? 'Your created classes' : 'Your enrolled classes'}</span></h1>
           <div className="flex justify-between">
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here are your classes</p>
            <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            {({ focus }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  focus ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                 
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              </div>
          </div>
          {/* SORT */}
         
          <div className="flex flex-wrap w-full mx-auto justify-center">
            {currentList.map((module, index) =>
              <div key={index} className="h-[500px] m-10 w-80 rounded-lg border-2 border-gray-100 py-8 px-6 shadow-lg shadow-gray-200">
                <p className="text-lg text-indigo-500 font-bold">{module.title}</p>
                <p className="text-sm font-semibold text-gray-500">Title</p>
                <p className="mt-3 text-4xl font-bold">$0</p>
                <p className="tesxt-sm font-semibold text-gray-500">Per month</p>
                <button className="mt-4 w-full rounded-lg border-2 border-indigo-400 px-10 py-2 text-sm text-indigo-500 font-semibold hover:bg-indigo-400 hover:text-white"
                  onClick={() => viewLearningModuleDetail(module.id.toString())}
                >View details</button>
                <ul className="mt-4 space-y-2 font-semibold">
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>Duration: {module.duration}</span></li>
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>Start Date: {module.startDate}</span></li>
                  <li className="flex items-center space-x-4"><span className="h-2 w-2 rounded-full bg-black"></span><span>End Date: {module.endDate}</span></li>
                </ul>
                <hr className="my-4" />
                <ul className="space-y-2 font-semibold">
                  <li className="flex items-center space-x-2 text-rose-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span><i>Desc:</i> {module.description}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span>Subject: {getSubjectString(module.subject)}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span>Maximum Learners: {module.maximumLearners} learners</span>
                  </li>
                </ul>
              </div>
            )}


          </div>
          <div className="justify-center p-5 flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-2">{renderPageNumbers()}</div>
            <button
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}