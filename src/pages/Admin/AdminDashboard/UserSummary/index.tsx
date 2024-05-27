import React, { useEffect, useRef, useState } from 'react';
import { AdminService } from '../../../../services';

export const UserSummary: React.FC = () => {
  const [totalTutors, setTotalTutors] = useState<number>(0);
  const [totalLeaner, setTotalLearner] = useState<number>(0);
  const [totalClass, setTotalClass] = useState<number>(0);
  const [TotalRevenue, setTotalRevenue] = useState<number>(0);

  const fetchTotalTutor = async () => {
    try {
      const data = await AdminService.countTutor();
      setTotalTutors(data);
    } catch (error) {
      console.error('Error fetching tutor count:', error);
    }
  };

  useEffect(() => {
    fetchTotalTutor();
  }, []);

  const fetchTotalLearner = async () => {
    try {
      const data = await AdminService.countLearner();
      setTotalLearner(data);
    } catch (error) {
      console.error('Error fetching leaner count:', error);
    }
  };

  useEffect(() => {
    fetchTotalLearner();
  }, []);

  const fetchTotalClass = async () => {
    try {
      const data = await AdminService.countClass();
      setTotalClass(data);
    } catch (error) {
      console.error('Error fetching leaner count:', error);
    }
  };

  useEffect(() => {
    fetchTotalClass();
  }, []);

  const fetchTotalRevenue = async () => {
    try {
      const data = await AdminService.totalRevenue();
      setTotalRevenue(data);
    } catch (error) {
      console.error('Error fetching leaner count:', error);
    }
  };

  useEffect(() => {
    fetchTotalRevenue();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
        <div id="TotalTutor">
          <h3 className="font-bold">Total Tutor</h3>
          <p className="text-gray-500">{totalTutors}</p>
        </div>
        <i className="fa-solid fa-users p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">Total Learner</h3>
          <p className="text-gray-500">{totalLeaner}</p>
        </div>
        <i className="fa-solid fa-user-plus p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">Total Class</h3>
          <p className="text-gray-500">{totalClass}</p>
        </div>
        <i className="fa-solid fa-clipboard p-4 bg-gray-200 rounded-md"></i>
      </div>
      <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
        <div>
          <h3 className="font-bold">Total Revenue</h3>
          <p className="text-gray-500">{TotalRevenue}</p>
        </div>
        <i className="fa-solid fa-clipboard-list p-4 bg-gray-200 rounded-md"></i>
      </div>
    </div>
  );
};
