import React, { useEffect, useRef, useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { ManageAccount } from "./ManageAccount";
import { ReportSystem } from "./ReportSystem";
import { ReportUser } from "./ReportUser";
import { useNavigate } from "react-router-dom";
import { ManageRevenue } from "./ManageRevenue";

export function Manage() {

  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const mainContentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const [selectedTab, setSelectedTab] = useState<string>('dashboard');

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tab: string) => {
    highlightSidebarItem(e.currentTarget);
    setSelectedTab(tab);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;

    if (sidebar && mainContent) {
      sidebar.style.width = "16rem";
      mainContent.style.marginLeft = "16rem";
      sidebar.classList.add("text-left", "px-6");
      sidebar.classList.remove("text-center", "px-0");

      const labels = sidebar.querySelectorAll("span");
      labels.forEach((label) => label.classList.remove("opacity-0"));
    }
  }, []);

  const expandSidebar = () => {
    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;

    if (sidebar && mainContent) {
      if (sidebar.style.width === "16rem") {
        sidebar.style.width = "4rem";
        mainContent.style.marginLeft = "4rem";
        sidebar.classList.remove("text-left", "px-6");
        sidebar.classList.add("text-center", "px-0");
      } else {
        sidebar.style.width = "16rem";
        mainContent.style.marginLeft = "16rem";
        sidebar.classList.add("text-left", "px-6");
        sidebar.classList.remove("text-center", "px-0");
      }

      const labels = sidebar.querySelectorAll("span");
      labels.forEach((label) => label.classList.toggle("opacity-0"));
    }
  };

  const highlightSidebarItem = (element: HTMLButtonElement) => {
    const buttons = sidebarRef.current?.querySelectorAll("button");
    if (buttons) {
      buttons.forEach((btn) => {
        btn.classList.remove("bg-gradient-to-r", "from-cyan-400", "to-cyan-500", "text-white", "w-48", "ml-0");
        const icon = btn.querySelector("i");
        if (icon) {
          icon.classList.remove("text-white");
        }
      });
    }
    element.classList.add("bg-gradient-to-r", "from-cyan-400", "to-cyan-500", "w-56", "h-10", "ml-0");
    const icon = element.querySelector("i");
    if (icon) {
      icon.classList.add("text-white");
    }
  };

  const handleLogoutClick = () => {
    navigate('/auth/login');
  };

  return (
    <body className="overflow-x-hidden">
      <div className="fixed z-10">
        <nav className=" w-[100vw] bg-white border-b border-gray-300">
          <div className="flex justify-between items-center px-6 w-full">
            {/* Icon Menu */}
            <button id="menu-button" onClick={expandSidebar} className="p-2">
              <i className="fas fa-bars text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600 text-lg"></i>
            </button>

            {/* Search */}

            {/* Notification and Profile */}
            <div className="space-x-4 flex items-center">
              <button className="p-2">
                <i className="fas fa-user text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600 text-lg"></i>
              </button>
              <button className="p-2">
                <i className="fas fa-sign-out-alt text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600 text-lg" onClick={handleLogoutClick}></i>
              </button>
            </div>
          </div>
        </nav>


        {/* Menu */}
        <div ref={sidebarRef} className="w-28 bg-white h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden">
          {/* Items */}
          <div className="p-2 space-y-4">
            {/* Dashboard */}
            <button
              className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onClick={(e) => handleTabClick(e, 'dashboard')}

            >
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium transition-all duration-200 opacity-0">Dashboard</span>
            </button>

            {/* Manage Account */}
            <button
              className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onClick={(e) => handleTabClick(e, 'account')}
            >
              <i className="fas fa-users"></i>
              <span className="font-medium transition-all duration-200 opacity-0">Manage Account</span>
            </button>

            {/* Manage Revenue */}
            <button
              className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onClick={(e) => handleTabClick(e, 'payment')}
            >
              <i className="fas fa-money-check-alt"></i>
              <span className="font-medium transition-all duration-200 opacity-0">Manage Revenue</span>
            </button>

            {/* Reported System Issues */}
            <button id="report-system"
              className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onClick={(e) => handleTabClick(e, 'reportSystem')}
            >
              <i className="fas fa-exclamation-circle"></i>
              <span className="font-medium transition-all duration-200 opacity-0">Reported System</span>
            </button>

            {/* Reported User Issues */}
            <button
              className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
              onClick={(e) => handleTabClick(e, 'reportUser')}
            >
              <i className="fas fa-user-cog"></i>
              <span className="font-medium transition-all duration-200 opacity-0">Reported User</span>
            </button>
          </div>
        </div>
      </div>


      {/* Content */}

      <div ref={mainContentRef} className="ml-16 bg-gray-100   w-full  transition-all duration-200 ease-in-out ">
        {selectedTab === 'dashboard' && (
          <AdminDashboard />
        )}
        {selectedTab === 'account' && (
          <ManageAccount />
        )}
        {selectedTab === 'reportSystem' && (
          <ReportSystem />
        )}
        {selectedTab === 'reportUser' && (
          <ReportUser />
        )}
        {selectedTab === 'payment' && (
          <ManageRevenue />
        )}
      </div>
    </body>
  );

}