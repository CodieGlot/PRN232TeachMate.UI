import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { AdminService } from '../../../../services';
import { TotalRevenueForMonthDto } from '../../../../common/dtos/Admin/TotalRevenueForMonthDto';

interface ChartsProps {
    chartType: 'bar' | 'pie' | 'heatmap';
}

const fetchMonthlyRevenue = async (year: number, month: number): Promise<number> => {
    const dto: TotalRevenueForMonthDto = { year, month };
    return AdminService.totalRevenueForMontkh(dto);
};

const getMonthName = (month: number): string => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('default', { month: 'short' });
};

export const Charts: React.FC<ChartsProps> = ({ chartType }) => {
    const [revenueData, setRevenueData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        const fetchRevenueData = async () => {
          const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
          const currentYear = new Date().getFullYear();
          const promises = [];
          const monthLabels = [];
    
          for (let i = 3; i >= 0; i--) {
            const month = currentMonth - i;
            const year = month <= 0 ? currentYear - 1 : currentYear;
            const adjustedMonth = month <= 0 ? 12 + month : month;
            promises.push(fetchMonthlyRevenue(year, adjustedMonth));
            monthLabels.push(getMonthName(adjustedMonth));
          }
    
          const results = await Promise.all(promises);
          setRevenueData(results);
          setMonths(monthLabels);
          setLoading(false);
        };
    
        fetchRevenueData();
      }, []);

    // Define chartOptions with the type ApexOptions for type safety
    const chartOptions: Record<ChartsProps['chartType'], { options: ApexOptions; series: ApexOptions['series'] }> = {
        bar: {
            series: [{ name: 'Sample Data', data: revenueData }],
            options: { chart: { type: 'bar' }, xaxis: { categories: months } },
        },
        pie: {
            series: [1000, 500, 100],
            options: { chart: { type: 'pie' }, labels: ['Guest', 'User', 'Active User within 3 month'] },
        },
        // candlestick: {
        //     series: [{ data: [{ x: new Date(), y: [20, 30, 40, 50] }] }],
        //     options: { chart: { type: 'candlestick' } },
        // },
        heatmap: {
            series: [{ name: 'Metric1', data: [60, 20, 30, 50] }],
            options: { chart: { type: 'heatmap' }, xaxis: { categories: ['X1', 'X2', 'X3', 'X4'] } },
        },
    };

    return (
        <Chart
            options={chartOptions[chartType].options}
            series={chartOptions[chartType].series}
            type={chartType}
            width="100%"
            height="100%"
        />
    );
};
