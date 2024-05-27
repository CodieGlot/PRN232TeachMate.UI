import React, { useEffect, useRef, useState } from 'react';
import { AdminService, UserDetailService } from "../../../services";
import { PaymentStatus } from '../../../common/enums';
import { SearchPaymentOrderDto } from '../../../common/dtos/Search/SearchPaymentOrderDto';
import { HasClaimedDto } from '../../../common/dtos/Admin/HasClaimedDto';
import { AccountInformation, AppUser, PaymentOrder } from '../../../interfaces';

export function ManageRevenue() {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ [id: string]: AppUser }>({});
  const [account, setAccount] = useState<{ [id: string]: AccountInformation }>({});
  //  const [listAccount, setListAccount] = useState<AccountInformation[]>([]);
  const [list, setList] = useState<PaymentOrder[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<number[]>([]);
  const [selectedTab, setSelectedTab] = useState<'list' | 'detail'>('list');
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<PaymentOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState<SearchPaymentOrderDto>({
    hasClaimed: null,
    paymentStatus: null,
  });

  const getStatus = (num: number): string => {
    return PaymentStatus[num];
  };

  const fetchPaymentOrder = async (query: SearchPaymentOrderDto) => {
    try {
      const data = await AdminService.searchPaymentOrder(query);
      setList(data);
    } catch (error) {
      console.error('Error fetching payments order:', error);
    }
  };
  useEffect(() => {
    fetchPaymentOrder(searchQuery);
  }, [searchQuery]);

  const fetchAllPaymentOrder = async () => {
    try {
      const data = await AdminService.getAllPaymentOrder();
      setList(data);
    } catch (error) {
      console.error('Error fetching all system payments:', error);
    }
  };

  useEffect(() => {
    fetchAllPaymentOrder();
  }, []);

  const fetchUserById = async (id: string) => {
    try {
      const data = await UserDetailService.getUserById(id);
      setUser((prev) => ({ ...prev, [id]: data }));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    // Fetch learner names for all payments in the list
    list.forEach(payment => {
      if (!user[payment.learnerId]) {
        fetchUserById(payment.learnerId);
      }
      if (!user[payment.learningModule.tutorId]) {
        fetchUserById(payment.learningModule.tutorId);
      }
    });
  }, [list]);

  const fetchAccountInfo = async (id: string) => {
    try {
      const data = await AdminService.getAccountInformationByTutorId(id);
      setAccount((prev) => ({ ...prev, [id]: data }));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    list.forEach(payment => {
      if (!account[payment.learningModule.tutorId]) {
        fetchAccountInfo(payment.learningModule.tutorId);
      }
    });
  }, [list]);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const updatedQuery: SearchPaymentOrderDto = {
      ...searchQuery,
      paymentStatus: value === "All" ? null : parseInt(value),
    };
    setSearchQuery(updatedQuery);
    console.log(searchQuery);
    //await fetchPaymentOrder(updatedQuery);
  };

  const handleHasClaimedChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const updatedQuery: SearchPaymentOrderDto = {
      ...searchQuery,
      hasClaimed: value === "All" ? null : value === "true",
    };
    setSearchQuery(updatedQuery);
    console.log(updatedQuery);
    //await fetchPaymentOrder(updatedQuery);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelectedPayment(list.map(payment => payment.id));
    } else {
      setSelectedPayment([]);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLInputElement>, paymentId: number) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedPayment(prevSelectedPayment => [...prevSelectedPayment, paymentId]);
    } else {
      setSelectedPayment(prevSelectedPayment => prevSelectedPayment.filter(id => id !== paymentId));
    }
  };

  const handleViewMoreClick = async (paymentId: number) => {
    try {
      const paymentDetail = await AdminService.getPaymentByID(paymentId);
      setSelectedPaymentDetail(paymentDetail);
      //setSelectedPaymentId(paymentId);
      setSelectedTab('detail');
    } catch (error) {
      console.error('Error fetching payment detail:', error);
    }
  };

  const handleCloseTab = () => {
    setSelectedTab('list');
    setSelectedPaymentDetail(null);
  };

  const handleHasClaimed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hasClaimed = event.target.value === 'true';
    if (selectedPaymentDetail) {
      setSelectedPaymentDetail(prev => prev ? { ...prev, hasClaimed } : null);
    }
  };

  const handleConfirmUpdate = async () => {
    // Logic to confirm and update payment details
    if (selectedPaymentDetail) {
      const hasClaimedDto: HasClaimedDto = {
        id: selectedPaymentDetail.id,
        hasClaimed: selectedPaymentDetail.hasClaimed
      };
      try {
        await AdminService.updateHasClaimed(hasClaimedDto);
        // Optionally perform other actions after confirmation
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    }
    handleCloseTab(); // Close the tab after confirmation
    await fetchPaymentOrder(searchQuery);
  };

  return (
    <div ref={mainContentRef} className="p-5 z-0 ml-16 bg-gray-100 min-h-screen w-full lg:w-4/5 overflow-y-auto transition-all duration-200 ease-in-out">
      <div className="mt-10 flex flex-wrap mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">Manage Revenue</span>
                </h3>
                <div className="flex items-center space-x-3">
                  
                  <select
                    name="paymentStatus"
                    className="ml-3 p-2 rounded-full border border-gray-300"
                    onChange={handleStatusChange}
                  >
                    <option value="All">All Status</option>
                    {Object.keys(PaymentStatus)
                      .filter(key => isNaN(Number(key)))
                      .map((key) => (
                        <option key={key} value={PaymentStatus[key as keyof typeof PaymentStatus]}>
                          {getStatus(PaymentStatus[key as keyof typeof PaymentStatus])}
                        </option>
                      ))}
                  </select>
                  <select
                    name="hasClaimed"
                    className="ml-3 p-2 rounded-full border border-gray-300"
                    onChange={handleHasClaimedChange}
                  >
                    <option value="All">All Claimed Status</option>
                    <option value="true">Claimed</option>
                    <option value="false">Not Claimed</option>
                  </select>
                </div>
              </div>
              {/* end card header */}
              {/* card body */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[50px]">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="pb-3 text-start min-w-[100px]">LEARNER NAME</th>
                        <th className="pb-3 text-end min-w-[100px]">TUTOR NAME</th>
                        <th className="pb-3 text-end min-w-[100px]">CLASS NAME</th>
                        <th className="pb-3 text-end min-w-[75px]">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((payment) => (
                        <tr key={payment.id} className="border-b border-dashed last:border-b-0">
                          <td className="p-3 pl-0">
                            <input
                              type="checkbox"
                              name={`selectUser-${payment.id}`}
                              className="form-checkbox"
                              checked={selectedPayment.includes(payment.id)}
                              onChange={(e) => handleUserSelect(e, payment.id)}
                            />
                          </td>
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="flex flex-col justify-start">
                                <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                  {user[payment.learnerId]?.username}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {user[payment.learningModule.tutorId]?.username}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {payment.learningModule?.title}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {getStatus(payment.paymentStatus)}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleEditClick(payment.id)}>
                              Edit
                            </button> */}
                            <div className="w-full h-15 flex items-center justify-center cursor-pointer">
                              <div
                                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-black-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-while-50 dark:bg-while-700 dark:text-black dark:hover:text-black dark:shadow-none group">
                                <span
                                  className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    className="w-5 h-5 text-black-400"
                                  >
                                    <path
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      stroke-width="2"
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    className="w-5 h-5 text-black-400"
                                  >
                                    <path
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      stroke-width="2"
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                    ></path>
                                  </svg>
                                </span>
                                <span
                                  className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black dark:group-hover:text-black" onClick={() => handleViewMoreClick(payment.id)}
                                >View More</span>
                              </div>
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* end card body */}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for payment Detail */}
      {selectedTab === 'detail' && selectedPaymentDetail && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Payment Detail
                  </h3>
                  {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                  </p> */}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedPaymentDetail.paymentAmount}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {account[selectedPaymentDetail.learningModule?.tutorId]?.fullName}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Tax Code
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {account[selectedPaymentDetail.learningModule?.tutorId]?.taxCode}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Bank Code
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {account[selectedPaymentDetail.learningModule?.tutorId]?.bankCode}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Account Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {account[selectedPaymentDetail.learningModule?.tutorId]?.accountNumber}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Has Claimed
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <select value={selectedPaymentDetail?.hasClaimed?.toString() ?? 'false'}
                          onChange={handleHasClaimed}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </dd>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-end space-x-4">
                        <button onClick={handleConfirmUpdate} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Confirm
                        </button>
                        <button onClick={handleCloseTab} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Cancel
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );

}
