import { useEffect, useState } from "react";
import { Header } from "../../../../layouts";
import { DayOfWeek } from "../../../../common/enums";
import { useLocation, useNavigate } from "react-router-dom";
import { ScheduleService } from "../../../../services/ScheduleService";
import { LearningModule } from "../../../../interfaces";
import { WeeklySlotDto } from "../../../../common/dtos/Schedule/WeeklySlotDto";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export function AddWeeklySchedule() {
    const [slots, setSlots] = useState<{ key: string, day: DayOfWeek, startTime: string, endTime: string }[]>([]);
    const location = useLocation();
    const { state } = location;
    const [weeklySlots, setWeeklySlots] = useState<WeeklySlotDto[]>([]);
    const navigate = useNavigate();

    const handleAddWeeklySchedule = async () => {
        if (!state) {
          return <div>No state available</div>;
        }

        const id = state as number;
        const learningModuleId = id;

        try {
          await ScheduleService.addWeeklySchedule({
            learningModuleId,
            weeklySlots
          });

          navigate("/schedule");
        } catch (err) {
          console.error("Add weekly schedule detail failed:", err);

          if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<any>;
            if (axiosError.response) {
                const { data } = axiosError.response;
                if (data) {
                    if (data.errors) {
                        Object.values(data.errors).forEach((errMsgList) => {
                            (errMsgList as string[]).forEach((errMsg: string) => {
                                toast.error(errMsg);
                            });
                        });
                    } else if (data.message) {
                        toast.error(data.message);
                    }
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        } else {
            toast.error("An unexpected error occurred.");
        }
        }
    };

    const deleteSlot = (key: string) => {
        setSlots(prevSlots => prevSlots.filter(slot => slot.key !== key));
    };

    const generateUniqueKey = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const addSlots: React.MouseEventHandler<HTMLButtonElement> = () => {
        const keyForDiv = generateUniqueKey();
        setSlots(prevSlots => [
            ...prevSlots,
            { key: keyForDiv, day: DayOfWeek.Sunday, startTime: "09:00", endTime: "18:00" }
        ]);
    };

    const handleSlotChange = (key: string, field: string, value: string) => {
        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.key === key ? { ...slot, [field]: value } : slot
            )
        );
    };

    const handleSlotDayChange = (key: string, field: string, value: DayOfWeek) => {
        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.key === key ? { ...slot, [field]: value } : slot
            )
        );
    };

    useEffect(() => {
        setWeeklySlots(
            slots.map(slot => ({
                dayOfWeek: slot.day,
                startTime: slot.startTime,
                endTime: slot.endTime
            }))
        );
    }, [slots]);

    return (
        <>
            <Header />

            <div className="mx-auto w-1/2">
                <form>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-900 dark:text-white text-base font-medium">Your schedule</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" name="business-hours" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="sr-only">Business hours</span>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">Don't teach too much because you will be overwhelmed</p>
                    </div>
                    <div className="mb-6 leading-normal text-indigo-400 font-semibold">
                        <div className="flex items-center justify-between">
                            <h4>Day of week</h4>
                            <h4 className="w-full max-w-[7rem]">Start Time</h4>
                            <h4 className="w-full max-w-[7rem]">End Time</h4>
                            <h4 className="w-full max-w-[7rem]">Delete</h4>
                        </div>
                    </div>
                    {slots.map(slot => (
                        <div className="mb-6" key={slot.key}>
                            <div className="flex items-center justify-between">
                                <label htmlFor={`day-${slot.key}`} className="sr-only">Day</label>
                                <select
                                    id={`day-${slot.key}`}
                                    className="appearance-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 p-2.5 ring-1 ring-indigo-100 text-gray-900 rounded-lg"
                                    value={slot.day}
                                    onChange={(e) => handleSlotDayChange(slot.key, 'day', parseInt(e.target.value))}
                                >
                                    <option value={DayOfWeek.Sunday}>Sunday</option>
                                    <option value={DayOfWeek.Monday}>Monday</option>
                                    <option value={DayOfWeek.Tuesday}>Tuesday</option>
                                    <option value={DayOfWeek.Wednesday}>Wednesday</option>
                                    <option value={DayOfWeek.Thursday}>Thursday</option>
                                    <option value={DayOfWeek.Friday}>Friday</option>
                                    <option value={DayOfWeek.Saturday}>Saturday</option>
                                </select>
                                <div className="w-full max-w-[7rem]">
                                    <label htmlFor={`start-time-${slot.key}`} className="sr-only">Start time</label>
                                    <input
                                        type="time"
                                        id={`start-time-${slot.key}`}
                                        name={`start-time-${slot.key}`}
                                        className="bg-gray-50 border leading-none border-indigo-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={slot.startTime}
                                        min="09:00"
                                        max="18:00"
                                        required
                                        onChange={(e) => handleSlotChange(slot.key, 'startTime', e.target.value)}
                                    />
                                </div>
                                <div className="w-full max-w-[7rem]">
                                    <label htmlFor={`end-time-${slot.key}`} className="sr-only">End time</label>
                                    <input
                                        type="time"
                                        id={`end-time-${slot.key}`}
                                        name={`end-time-${slot.key}`}
                                        className="bg-gray-50 border leading-none border-indigo-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={slot.endTime}
                                        min="09:00"
                                        max="18:00"
                                        required
                                        onChange={(e) => handleSlotChange(slot.key, 'endTime', e.target.value)}
                                    />
                                </div>
                                <div className="w-full max-w-[7rem]">
                                    <button type="button" className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => deleteSlot(slot.key)}>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="mt-4 text-blue-500 hover:text-blue-700 focus:outline-none font-medium" onClick={addSlots}>
                        + Add Slot
                    </button>
                    <div className="pt-10">
                        <button type="button"
                        onClick={handleAddWeeklySchedule}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
