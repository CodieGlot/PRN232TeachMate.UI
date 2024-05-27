import React, { useRef } from "react";
import { UserSummary } from '../UserSummary';
import { Charts } from "../ChartUI";

export function AdminDashboard() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  return (

    <div ref={mainContentRef}
      className="ml-16 bg-gray-100 min-h-screen w-full lg:w-4/5 overflow-y-auto transition-all duration-200 ease-in-out
    ">

      {/* Main Content */}
      <div className="mt-20 bg-white p-4 rounded-md shadow-md">
        <section className="p-5">
          <UserSummary />
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="m-2 shadow-md">
              <h2 className="text-xl p-2">Bar Chart</h2>
              <div id="chart" className="w-full">
                <Charts chartType="bar" />
              </div>
            </div>
            <div className="overflow-x-auto m-2 shadow-md">
              <h2 className="text-xl p-2">Pie Chart</h2>
              <div id="pie_chart" className="w-full">
                <Charts chartType="pie" />
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="m-2 lg:col-span-1 shadow-md">
              <h2 className="text-xl p-2">Pie Chart</h2>
              <div id="pie_chart" className="w-full">
                <Charts chartType="pie" />
              </div>
            </div> */}
            {/* <div className="m-2 lg:col-span-2 shadow-md">
              <h2 className="text-xl p-2">Candlestick Chart</h2>
              <div id="candle_chart" className="w-full">
                <Charts chartType="candlestick" />
              </div>
            </div> */}
            {/* <div className="m-2 lg:col-span-2  m-2 shadow-md">
              <h2 className="text-xl p-2">Reccently User</h2>
            </div>
          </div> */}
          <div className="grid grid-cols-1">
            <div className="m-2 shadow-md">
              <h2 className="text-xl p-2">Heatmap Chart</h2>
              <div id="heatmap_chart" className="w-full">
                <Charts chartType="heatmap" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
