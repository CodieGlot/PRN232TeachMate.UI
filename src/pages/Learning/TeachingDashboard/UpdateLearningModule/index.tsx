
import { ModuleType, Subject } from "../../../../common/enums";
import { Header } from "../../../../layouts";
import { useState } from "react";
import { LearningModuleService } from "../../../../services/LearningModuleService";
import { useNavigate } from "react-router-dom";

export function UpdateLearningModule() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<Subject>(0);
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [maximumLearners, setMaximumLearners] = useState<number>(0);
  const [moduleType, setModuleType] = useState<ModuleType>(0);
  const [numOfWeeks, setNumOfWeeks] = useState<number>(0);
  const navigate = useNavigate();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleCreateLearningModule = async () => {

    try {
      
      const learningModule = await LearningModuleService.createLearningModule({
        title,
        description,
        subject,
        gradeLevel,
        duration,
        startDate,
        endDate,
        maximumLearners,
        moduleType,
        numOfWeeks
      });
      if (moduleType == ModuleType.Weekly) navigate("/add-weekly-schedule", {state: {learningModule}})
        else navigate("/learning");
    } catch (error) {
      console.error("Add learning module failed:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-3 px-4 mx-auto max-w-2xl lg:py-5">
          <div className=" mx-auto py-2 mb-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Update new class</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Update your class in one day before the start time</p>
          </div>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text" name="title" id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type class title" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
              </div>
              <div className="w-full">
                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                <input type="number" name="duration" id="duration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Duration" 
                  required
                  value={duration}
                  onChange={(e) => setDuration(Number.parseInt(e.target.value))}
                  />
              </div>
              <div className="w-full">
                <label htmlFor="moduleType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Module Type</label>
                <select id="moduleType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={moduleType}
                onChange={(e) => setModuleType(Number.parseInt(e.target.value))}>
                  <option value={ModuleType.Custom} selected>Custom</option>
                  <option value={ModuleType.Weekly}>Weekly</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="maximumLearners" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Learners</label>
                <input type="number" name="maximumLearners" id="maximumLearners"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Maximum Learners" 
                  required
                  value={maximumLearners}
                  onChange={(e) => setMaximumLearners(Number.parseInt(e.target.value))}
                  />
              </div>
              <div className="w-full">
                <label htmlFor="numOfWeeks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num of Weeks</label>
                <input type="number" name="numOfWeeks" id="numOfWeeks"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Num of Weeks" required 
                  value={numOfWeeks}
                  onChange={(e) => setNumOfWeeks(Number.parseInt(e.target.value))}
                  />
              </div>
              <div className="w-full">
                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  value={(startDate)}
                  onChange={handleStartDateChange}
                  />
                </div>
              </div>
              <div className="w-full">

                <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Select date"
                  value={(endDate)}
                  onChange={handleEndDateChange} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                <select id="subject"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                 value={subject}
                 onChange={(e) => setSubject(Number.parseInt(e.target.value))}>
                  <option selected value={Subject.None}>Select subject</option>
                  <option value={Subject.Maths}>Maths</option>
                  <option value={Subject.Literature}>Literature</option>
                  <option value={Subject.Physics}>Physics</option>
                  <option value={Subject.Chemistry}>Chemistry</option>
                  <option value={Subject.History}>History</option>
                  <option value={Subject.Geography}>Geography</option>
                  
                </select>

              </div>
              <div>
                <label htmlFor="gradeLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade Level</label>
                <input type="gradeLevel" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12" 
                  required
                  value={gradeLevel}
                  min={10}
                  max={12}
                  onChange={(e) => setGradeLevel(Number.parseInt(e.target.value))} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea rows={8} id="description" 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleCreateLearningModule}
                className="text-white bg-gradient-to-r to-indigo-600 from-sky-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Save</button>
            </div>
          </form>
        </div >
      </section >
    </>
  );
}
