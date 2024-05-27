import React, { useState, useEffect } from "react";
import { SearchService } from "../../../services";
import { SearchClassDto } from "../../../common/dtos";
import { LearningModule } from "../../../interfaces";
import { Subject } from "../../../common/enums";
import { ModuleType } from "../../../common/enums";
import {
  Dialog, //Là một thành phần UI dùng để hiển thị một hộp thoại (dialog) lên màn hình. Thường được sử dụng để yêu cầu người dùng cung cấp thông tin hay xác nhận một hành động quan trọng.
  DialogPanel, //Đây là thành phần dùng để hiển thị nội dung bên trong của dialog, chẳng hạn như nội dung text, nút xác nhận/hủy.
  Disclosure, //Thường được sử dụng trong các thành phần UI để cho phép hiển thị hoặc ẩn nội dung bổ sung. Ví dụ như một phần mở rộng (expansion panel) hoặc một phần nội dung có thể được mở rộng ra.
  DisclosureButton, //Là nút hoặc thành phần dùng để kích hoạt hiển thị/ẩn đi của Disclosure.
  DisclosurePanel, //Là thành phần chứa nội dung được hiển thị hoặc ẩn đi bởi DisclosureButton.
  Menu, //Là nút hoặc thành phần dùng để kích hoạt hiển thị danh sách các lựa chọn của menu
  MenuButton, //Là nút hoặc thành phần dùng để kích hoạt hiển thị danh sách các lựa chọn của Menu.
  MenuItem, //Là các mục trong danh sách lựa chọn của Menu, người dùng có thể chọn một trong số các mục này.
  MenuItems, //Là một thành phần hoặc wrapper chứa tất cả các MenuItem trong Menu.
  Transition, //Thường dùng để điều khiển các hiệu ứng chuyển tiếp khi một thành phần xuất hiện hoặc biến mất. Các hiệu ứng này có thể là slide, zoom, hoặc fade.
  TransitionChild, //Là thành phần con của Transition, thường dùng để điều khiển các hiệu ứng chuyển tiếp của các phần tử con trong Transition.
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const getSubjectString = (subjectCode: number): string => {
  return Subject[subjectCode];
};
// const subCategories: string[] = [

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface SearchClassProps {
  searchQuery: string | undefined;
}

export function SearchClass({ searchQuery }: SearchClassProps) {


  const [message, setMessage] = useState<string | null>("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const navigate = useNavigate();

  const handleJoinClass = (id: number) => {
    navigate('/request-join', { state: { id } });
  };
  const [searchParams, setSearchParams] = useState<SearchClassDto>({   // use state là biến để lưu ban đầu và được thay đổi trong quá trình code bằng hàm set
    titleOrDesc: searchQuery || "",
    subject: 0,
    gradeLevel: -1,
    startOpenDate: null,
    endOpenDate: null,
    maximumLearners: -1,
    moduleType: 2,
    numOfWeeks: -1,
    maxPrice: -1,
    minPrice: -1
  });

  const getModuleType = (moduleTypeCode: number): string => {
    return ModuleType[moduleTypeCode];
  };


  useEffect(() => {
    if (searchQuery) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        titleOrDesc: searchQuery,
      }));
    }
  }, [searchQuery]);

  const [classes, setClasses] = useState<LearningModule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  const sectionsPerPage = 3;
  const totalPages = Math.ceil(classes.length / sectionsPerPage);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await SearchService.searchClass(searchParams);
        setClasses(data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching classes:", error);
        setMessage("Classes not found");
        setClasses([])
      }
    };
    fetchClasses();
  }, [searchParams]);

  // const viewLearningModuleDetail = async (id: string) => {
  //   try {

  //     navigate("/view-learning-module-detail?id=" + id, { state: id })
  //   } catch (error) {
  //     console.error("Error fetching learning module:", error);

  //   }
  // }
  const indexOfLastClass = currentPage * sectionsPerPage;
  const indexOfFirstClass = indexOfLastClass - sectionsPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Kiểm tra nếu tên thuộc tính nằm trong danh sách các thuộc tính hợp lệ
    if (name === "subject" || name === "moduleType" || name === "gradeLevel" || name === "maximumLearners" || name === "numOfWeeks" || name === "maxPrice" || name === "minPrice") {
      // Thử chuyển đổi giá trị thành số nguyên
      const parsedValue = Number.parseInt(value);
      // Kiểm tra xem parsedValue có phải là một số hợp lệ hay không
      const isValidNumber = !isNaN(parsedValue);

      // Nếu parsedValue là số hợp lệ, sử dụng nó; nếu không, giữ nguyên giá trị là chuỗi
      setSearchParams({
        ...searchParams,
        [name]: isValidNumber ? parsedValue : value,
      });
    } else {
      // Nếu không phải là thuộc tính "subject", giữ nguyên giá trị là chuỗi
      setSearchParams({
        ...searchParams,
        [name]: value,
      });
    }

    // Reset currentPage nếu currentPage lớn hơn totalPages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  };

  const toggleDetails = (index: number) => {
    setExpandedClass(expandedClass === index ? null : index);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="">
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <div>
          {/* Mobile filter dialog  Cái này là UI của fiter------  Thanh search Trang 383*/}
          <Transition show={mobileFiltersOpen}>
            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <TransitionChild
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div className="fixed inset-0 z-40 flex">
                <TransitionChild
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <Disclosure as="div" key={1} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Search Criteria</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                          </>
                        )}
                      </Disclosure>
                      {/* ))} */}
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-0">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-sky-400 text-transparent bg-clip-text">Teach Mate</h1>
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
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">

                  {/* search criteria pc */}
                  {/* {filters.map((section) => ( */}
                  <Disclosure as="div" key={1} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Search Criteria</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">

                            <form className="max-w-sm mx-auto">
                              <label htmlFor="underline_select" className="sr-only">Underline select</label>
                              <select id="subject" name="subject" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={searchParams.subject}
                                onChange={handleSearchChange}
                              >
                                <option selected value={Subject.None}>Select subject</option>
                                <option value={Subject.Maths}>Maths</option>
                                <option value={Subject.Literature}>Literature</option>
                                <option value={Subject.Physics}>Physics</option>
                                <option value={Subject.Chemistry}>Chemistry</option>
                                <option value={Subject.History}>History</option>
                                <option value={Subject.Geography}>Geography</option>
                              </select>
                              <label htmlFor="underline_select" className="sr-only">Underline select</label>
                              <select id="underline_select" name="moduleType" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={searchParams.moduleType}
                                onChange={handleSearchChange}>
                                <option value={ModuleType.None} selected>Select module type</option>
                                <option value={ModuleType.Custom} >Custom</option>
                                <option value={ModuleType.Weekly}>Weekly</option>
                              </select>
                              <label htmlFor="underline_select" className="sr-only">Underline select</label>
                              <select id="gradeLevel" name="gradeLevel" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={searchParams.gradeLevel}
                                onChange={handleSearchChange}>
                                <option value={-1} selected>Choose a grade level</option>
                                <option value={10}>Grade 10</option>
                                <option value={11}>Grade 11</option>
                                <option value={12}>Grade 12</option>
                              </select>

                              <div className="w-full mt-5">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Price</label>
                                <input type="number" name="maxPrice" id="price"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  value={searchParams.maxPrice === -1 ? '' : searchParams.maxPrice}
                                  onChange={handleSearchChange}
                                  placeholder="Max Price"
                                  required

                                />
                              </div>

                              <div className="w-full mt-5">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Price</label>
                                <input type="number" name="minPrice" id="price"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  value={searchParams.minPrice === -1 ? '' : searchParams.minPrice}
                                  onChange={handleSearchChange}
                                  placeholder="Min Price"
                                  required

                                />
                              </div>

                              <div className="w-full mt-5">
                                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <div className="relative max-w-sm">

                                  <input type="date"
                                    id="startOpenDate" name="startOpenDate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={searchParams.startOpenDate || ""}
                                    onChange={handleSearchChange}
                                    placeholder="Select start date"

                                  />
                                </div>
                              </div>

                              <div className="w-full mt-5">
                                <label htmlFor="endOpenDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                <div className="relative max-w-sm">

                                  <input type="date"
                                    id="endOpenDate" name="endOpenDate"

                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={searchParams.endOpenDate || ""}
                                    onChange={handleSearchChange}
                                    placeholder="Select end date"

                                  />
                                  <div className="w-full mt-5">
                                    <label htmlFor="maximumLearners" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Learners</label>
                                    <input type="number" name="maximumLearners" id="maximumLearners"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      value={searchParams.maximumLearners === -1 ? '' : searchParams.maximumLearners}
                                      onChange={handleSearchChange}
                                      placeholder="Maximum Learners"
                                      required

                                    />
                                  </div>

                                  <div className="w-full mt-5">
                                    <label htmlFor="maximumLearners" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num of weeks</label>
                                    <input type="number" name="numOfWeeks" id="numOfWeeks"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      value={searchParams.numOfWeeks === -1 ? '' : searchParams.numOfWeeks}
                                      onChange={handleSearchChange}
                                      placeholder="Num of weeks"
                                      required

                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  {/* ))} */}
                </form>
                {/* NOI DUNG CHINH  CÁI NÀY GỌI BÊN PHẦN SEARCH*/}
                <div className="lg:col-span-3">
                  <div className="container mx-auto my-5">
                    <div>
                      <form className="relative w-full flex max-w-md mx-auto lg:mx-0 lg:max-w-none mb-8">
                        <div className="relative w-full flex rounded-lg overflow-hidden bg-gradient-to-r from-sky-400 to-indigo-600/30 p-0.5 shadow-lg">
                          <input
                            type="text"
                            name="titleOrDesc"
                            className="block w-full p-2.5 text-sm text-gray-900 bg-white border-2 border-violet-200 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search by any attribute..."
                            value={searchParams.titleOrDesc || ""}
                            onChange={handleSearchChange}
                          />
                          <button
                            type="button"
                            className="p-2.5 text-xs font-medium text-violet-400 bg-white border-solid border-2 border-violet-200 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                            onClick={() => setSearchParams({ ...searchParams, titleOrDesc: searchParams.titleOrDesc })}
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19L13.65 13.65M11 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="sr-only">Search</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <p className="mx-auto text-center">{message}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {currentClasses.map((classItem, index) => (
                        <div
                          key={index}
                          className="relative w-full group max-w-md min-w-0 mx-auto break-words bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
                        >
                          <div className="p-6">
                            <h3 className="text-lg text-indigo-500 font-bold">
                              {classItem.title}
                            </h3>
                            <p className="text-sm font-semibold text-gray-500">Title</p>
                            <p className="mt-3 text-4xl font-bold text-black ">${classItem.price}</p>
                            <p className="tesxt-sm font-semibold text-gray-500">Per month</p>

                            <hr className="my-4" />

                            <div className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                <span className="block">
                                  Subject: {getSubjectString(classItem.subject)}
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
                                    {classItem.gradeLevel}
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
                                    {classItem.startDate}
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
                                    {classItem.endDate}
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
                                    {classItem.maximumLearners}
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
                                  Module Type: {getModuleType(classItem.moduleType)}
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
                                    {classItem.numOfWeeks}
                                  </span>
                                </span>
                              </p>
                            </div>

                            <button
                              onClick={() => toggleDetails(index)}
                              className="mt-4 w-full rounded-lg border-2 border-indigo-400 px-10 py-2 text-sm text-indigo-500 font-semibold hover:bg-indigo-400 hover:text-white"
                            >
                              {expandedClass === index ? "Hide Details" : "Show Details"}
                            </button>
                            {expandedClass === index && (
                              <div className="mt-4 space-y-2">
                                <button className="block w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" onClick={() => handleJoinClass(classItem.id)}>
                                  Join
                                </button>
                                <button className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => navigate("/enroll-class?id=" + classItem.id)}>
                                  Try Now
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>


                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={prevPage}
                        className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${isFirstPage ? 'disabled:opacity-50' : ''}`}
                        disabled={isFirstPage}
                      >
                        Previous
                      </button>
                      <p className="text-gray-600">
                        Page {currentPage} of {totalPages}
                      </p>
                      <button
                        onClick={nextPage}
                        className={`px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 ${isLastPage ? 'disabled:opacity-50' : ''}`}
                        disabled={isLastPage}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}