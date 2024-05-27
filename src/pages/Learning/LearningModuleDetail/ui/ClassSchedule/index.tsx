import React, { useState, useEffect } from 'react';
import { LearningModule, LearningSession } from '../../../../../interfaces';
import { ScheduleService } from '../../../../../services/ScheduleService';
import { AddCustomScheduleModal, AddFreeCustomSessionModal } from '../../../Schedule';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthService } from '../../../../../services';
import { LearningModuleService } from '../../../../../services/LearningModuleService';
import { ModuleType, UserRole } from '../../../../../common/enums';
import { Button} from "flowbite-react";

export function ViewClassSchedule() {
    const [learningSessions, setLearningSessions] = useState<LearningSession[]>([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const learningModuleId = Number.parseInt(id || "0");
   
    const[learningModule, setLearningModule] = useState<LearningModule>();

    const user = AuthService.getCurrentUser();
    useEffect(() => {
        const fetchLearningSessions = async (id: number) => {
            try {
                const data = await ScheduleService.getScheduleById(id);
                const learningModule = await LearningModuleService.getLearningModuleById(learningModuleId.toString());
                setLearningModule(learningModule)
                setLearningSessions(data);
            } catch (error) {
                console.log("Error fetching learning modules:", error);
            }
        }
        if (id !== undefined) {
            fetchLearningSessions(learningModuleId);
            
        }
    }, [])
    const sessions: LearningSession[] = learningSessions;

    const timeStringToDouble = (timeString: string): number => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours + minutes / 60;
    };

    const getColor = (date: Date): string => {
        const dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 0: return "#22d3ee";
            case 1: return "#38bdf8";
            case 2: return "#60a5fa";
            case 3: return "#818cf8";
            case 4: return "#a78bfa";
            case 5: return "#c084fc";
            case 6: return "#e879f9";
            default: return "";
        }
    };

    const parseDate = (dateString: string) => {
        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        return new Date(year, month - 1, day);
    };
    // State to manage current week index and selected month
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    // Function to get week dates based on index and selected month
    const getWeekDates = (index: number): Date[] => {
        const currentDate = new Date(new Date().getFullYear(), selectedMonth, 1);
        currentDate.setDate(currentDate.getDate() + (index * 7)); // Adjust date based on index
        currentDate.setHours(0, 0, 0, 0); // Start at the beginning of the day

        const weekDates = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i - currentDate.getDay()); // Start from Sunday
            weekDates.push(date);
        }
        return weekDates;
    };

    // Function to render sessions for a given week
    const renderSessions = (weekIndex: number): (JSX.Element | null)[] => {
        const weekDates = getWeekDates(weekIndex);
        // const filteredSessions = filterSessionsByMonth(sessions, selectedMonth);

        return sessions.map((session, index) => {
            const sessionDate = session.date;
            const matchingDay = weekDates.find(day => day.getDate() === parseDate(sessionDate).getDate() && day.getMonth() == parseDate(sessionDate).getMonth());
            if (!matchingDay) return null;

            const leftPosition = 100 + matchingDay.getDay() * 110; // Calculate the left position
            const startTimeDouble = timeStringToDouble(session.startTime);
            const endTimeDouble = timeStringToDouble(session.endTime);
            const topPosition = (startTimeDouble - 7) * 50 + 2;
            const height = (endTimeDouble - startTimeDouble) * 50;
            const color = getColor(matchingDay);

            return (
                <a href={'session?id=' + session.id}>
                    <div
                        key={index}
                        className="text-white flex items-center justify-center absolute w-[110px] shadow-md"
                        style={{
                            left: `${leftPosition}px`,
                            top: `${topPosition}px`,
                            height: `${height}px`,
                            backgroundColor: color,
                            borderColor: color,
                            // boxShadow: `0 0 10px ${color}`,

                        }}
                    >

                        <div className='text-center font-sans'> 
                            <p className='font-bold'>{session.learningModuleName}</p>
                            <p className='text-xs'>{session.startTime.substring(0, 5)}-{session.endTime.substring(0, 5)}</p>
                        </div>
                    </div>
                </a>
            );
        }).filter(Boolean); // Filter out any null values
    };

    // Function to handle clicking next week button
    const handleNextWeek = (): void => {
        setCurrentWeekIndex((prevIndex) => prevIndex + 1);
    };

    // Function to handle clicking previous week button
    const handlePreviousWeek = (): void => {
        setCurrentWeekIndex((prevIndex) => prevIndex - 1);
    };

    // Function to handle month selection change
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedMonth = Number(event.target.value);
        setSelectedMonth(selectedMonth);
        setCurrentWeekIndex(0); // Reset current week index when changing month
    };

    const handleWeeklySchedule = () => {
        console.log(learningModuleId)
        navigate("/add-weekly-schedule", {state: learningModuleId})
    }

    // Effect to set current week index on initial load based on current date
    useEffect(() => {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const diffDays = Math.floor((currentDate.getTime() - startOfMonth.getTime()) / (1000 * 3600 * 24));
        const currentWeekIndex = Math.floor(diffDays / 7);
        setCurrentWeekIndex(currentWeekIndex + 1);
    }, []);

    return (
        <>
            <div className='h-[1200px]'>
                <div className=" flex items-center justify-between pb-6 w-5/6 p-8">
                    <div>
                        <h2 className="text-gray-600 font-semibold">Schedule</h2>
                        <span className="text-xs">All teaching session</span>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                        <div className="flex bg-gray-50 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                        </div>
                        <div className="lg:ml-40 ml-10 space-x-8">
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                {user?.userRole == UserRole.TUTOR && (<AddFreeCustomSessionModal learningModuleId={learningModuleId} />)}
                {(user?.userRole == UserRole.TUTOR && learningModule?.moduleType == ModuleType.Custom)  && (<AddCustomScheduleModal learningModuleId={learningModuleId} />)}
                {(user?.userRole == UserRole.TUTOR && learningModule?.moduleType == ModuleType.Weekly)  && (<Button color="gray" onClick={handleWeeklySchedule}>Add weekly schedule</Button>)}
                </div>
                
                <div className="mt-10 py-2 mb-5">

                    <div className="flex justify-between">
                        <h5 className="text-xl font-sm text-gray-600 dark:text-white">
                            {new Date().toLocaleString('en-US', { month: 'long' })}, {new Date().getDate()}-{new Date().getFullYear()}
                        </h5>
                        <div className="flex justify-end gap-2">
                            <select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className="border-2 border-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-7 py-2.5 text-center mb-2"
                            >
                                <option value={0}>January</option>
                                <option value={1}>February</option>
                                <option value={2}>March</option>
                                <option value={3}>April</option>
                                <option value={4}>May</option>
                                <option value={5}>June</option>
                                <option value={6}>July</option>
                                <option value={7}>August</option>
                                <option value={8}>September</option>
                                <option value={9}>October</option>
                                <option value={10}>November</option>
                                <option value={11}>December</option>
                            </select>

                            <button
                                type="button"
                                className="text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2"
                                onClick={handlePreviousWeek}
                                disabled={currentWeekIndex === 0} // Disable if already at the first week
                            >
                                Previous Week
                            </button>
                            <button
                                type="button"
                                className="text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2"
                                onClick={handleNextWeek}
                            >
                                Next Week
                            </button>

                           
                        
                        </div>
                    </div>
                    <div className="flex text-gray-400 font-serif gap-20 mt-8">
                        <p>Week</p>
                        {getWeekDates(currentWeekIndex).map((day, index) => (
                            <div key={index}>
                                <p>{day.getDate()}/{day.getMonth() + 1}</p>
                                <p>{day.toLocaleString('en-US', { weekday: 'short' })}</p>
                            </div>
                        ))}
                    </div>

                    {/* Horizontal lines */}
                    <div className="relative">
                        {[...Array(15)].map((_, index) => (
                            <div
                                key={index}
                                style={{ top: `${50 + index * 50}px` }}
                                className="absolute right-0 w-[88%] h-[1px] bg-gray-300"
                            ></div>
                        ))}
                    </div>
                </div>
                {/* Schedule display area */}
                <div className="relative mt-10 font-mono text-sm">
                    {/* Render time slots */}
                    {[...Array(15)].map((_, index) => (
                        <div
                            key={index}
                            style={{ top: `${index * 50}px` }}
                            className="absolute left-0 text-gray-400"
                        >
                            {index + 7}:00
                        </div>
                    ))}
                    {/* Render sessions */}
                    {renderSessions(currentWeekIndex)}
                </div></div>

        </>
    );
}
