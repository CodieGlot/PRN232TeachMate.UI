import { toast } from "react-hot-toast";
import { ModuleType, Subject } from "../../../common/enums";
import { Header } from "../../../layouts";
import { useState, useEffect } from "react";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import axios, { AxiosError } from "axios";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import Step from "../../Payment/Step";

interface LoginFormValues {
  title: string;
  duration: number;
  maximumLearners: number
  gradeLevel: number

}
// const url = window.location.href;
// const id = url.substring(url.lastIndexOf("/") + 1);
// console.log(id);
// const learningModule: LearningModule = await LearningModuleService.getLearningModuleById(id)

export function CreateLearningModule() {

  useEffect(() => {
    AOS.init();
  }, []);
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<Subject>(0);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [moduleType, setModuleType] = useState<ModuleType>(0);
  const [numOfWeeks, setNumOfWeeks] = useState<number>(0);
  const navigate = useNavigate();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const initialFormValues: LoginFormValues = {
    title: "",
    duration: 0,
    maximumLearners: 0,
    gradeLevel: 0

  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(1, "Title must be at least 1 characters")
      .max(100, "Title must be at maximum 100 characters"),
    duration: Yup.number()
      .required("Duration is required")
      .moreThan(29, "Duration must more than or equal 30")
      .lessThan(241, "Duration must less than or equal 240"),
    maximumLearners: Yup.number()
      .required("Maximum Learners is required")
      .moreThan(0, "Maximum Learners must more than or equal 0")
      .lessThan(6, "Maximum Learners must less than or equal 5"),
    gradeLevel: Yup.number()
      .required("Grade Level is required")

      .moreThan(9, "Grade Level must more than or equal 10")


      .lessThan(13, "Grade Level must less than or equal 12"),
  });
  const CurrendDateTime = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Get current year (YYYY)
    const currentMonth = currentDate.getMonth() + 1; // Get current month (1-12, add +1 for human-readable format)
    const currentDay = currentDate.getDate(); // Get current day of the month (1-31)


    if ((currentMonth < 10) && (currentDay<10)) return `${currentYear}-0${currentMonth}-0${currentDay}`;
    if (currentMonth < 10)  return `${currentYear}-0${currentMonth}-${currentDay}`;
    if (currentDay<10)  return `${currentYear}-${currentMonth}-0${currentDay}`;

    if (currentMonth < 10) return `${currentYear}-0${currentMonth}-${currentDay}`;


    return `${currentYear}-${currentMonth}-${currentDay}`;
  }
  const CurrentDateTimePlusOneWeek = () => {
    const currentDate = new Date();
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(currentDate.getDate() + 14);

    const currentYear = oneWeekLater.getFullYear();
    const currentMonth = oneWeekLater.getMonth() + 1; // Get month (0-11, hence +1 for 1-12)
    const currentDay = oneWeekLater.getDate();

    const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const formattedDay = currentDay < 10 ? `0${currentDay}` : currentDay;

    return `${currentYear}-${formattedMonth}-${formattedDay}`;
};

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };


  const handleCreateLearningModule = async (values: FormikValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    const { title, duration, maximumLearners, gradeLevel } = values;
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

     
      if (moduleType == ModuleType.Weekly) navigate("/manage-class?id=" + learningModule.id)
      else navigate("/manage-class?id=" + learningModule.id);


      if (moduleType == ModuleType.Weekly) navigate("/SetPrice?id=" + learningModule.id)
      else navigate("/SetPrice?id=" + learningModule.id);

    } catch (err) {
      console.error("Add learning module failed:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>; // Use any for generic AxiosError

        if (axiosError.response) {
          const { data } = axiosError.response;

          if (data) {
            if (data.errors) {
              // Handle validation errors
              Object.values(data.errors).forEach((errMsgList) => {
                (errMsgList as string[]).forEach((errMsg: string) => {
                  toast.error(errMsg);
                });
              });
            } else if (data.message) {
              // Handle API exceptions
              toast.error(data.message);
            }
          } else {
            toast.error("An unknown error occurred.");
          }
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);

    }
  };
  useEffect(() => {
    if (startDate && numOfWeeks) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + numOfWeeks * 7);
      setEndDate(end.toISOString().split('T')[0]);
    } else {
      setEndDate('');
    }
  }, [startDate, numOfWeeks]);

  return (
    <>
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <Header />
        <Step currentStep={1}/>



        <section className="bg-white dark:bg-gray-900">
          <div className="py-3 px-4 mx-auto max-w-2xl lg:py-5">
            <div className=" mx-auto py-2 mb-5">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Create new class</span></h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Update your details so anyone can know you</p>
            </div>
            <Formik
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              onSubmit={handleCreateLearningModule}
            >{({ isSubmitting }) => (
              <Form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <Field type="text" name="title" id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type class title"

                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="title"
                      component="div"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                    <Field type="number" name="duration" id="duration"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Duration"
                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="duration"
                      component="div"
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
                    <Field type="number" name="maximumLearners" id="maximumLearners"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Maximum Learners"
                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="maximumLearners"
                      component="div"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="numOfWeeks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num of Weeks</label>
                    <input type="number" name="numOfWeeks" id="numOfWeeks"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Num of Weeks" required
                      value={numOfWeeks}
                      min={1}
                      max={52}
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
                        // min={"2024-06-23"}
                        min={`${CurrendDateTime()}`}
                        max={`${CurrentDateTimePlusOneWeek()}`}
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
                        onChange={handleEndDateChange}

                        

                        readOnly />
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

                  

                    <Field type="number" name="gradeLevel" id="gradeLevel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                      placeholder="12"
                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="gradeLevel"
                      component="div"
                    />
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
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-gradient-to-r to-indigo-600 from-sky-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Create</button>
                </div>
              </Form>
            )}
            </Formik>
          </div >
        </section >
      </div>
    </>
  );
}
