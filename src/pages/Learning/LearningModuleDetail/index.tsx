import { Subject } from "../../../common/enums";
import { LearningModule } from "../../../interfaces/Learning/LearningModule";
import { Header } from "../../../layouts";
import { LearningModuleService } from "../../../services/LearningModuleService";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ViewClassSchedule } from "./ui/ClassSchedule";
import { AuthService, UserDetailService } from "../../../services";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AppUser } from "../../../interfaces";
// const url = window.location.href;
// const id = url.substring(url.lastIndexOf("/") + 1);
// console.log(id);
// const learningModule: LearningModule = await LearningModuleService.getLearningModuleById(id)

export function LearningModuleDetail() {
  useEffect(() => {
    AOS.init();
  }, []);
  const appUser = AuthService.getCurrentUser();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const [learningModule, setLearningModule] = useState<LearningModule>();
  const [number, setNumber] = useState(0);
  const [tutor, setTutor] = useState<AppUser>();

  const navigate = useNavigate();


  const getSubjectString = (subjectCode: number | undefined): string => {

    if (subjectCode == undefined) { return "" }
    return Subject[subjectCode];
  };




  useEffect(() => {
    const viewLearningModuleDetail = async () => {
      try {
        if (id != null) {
          const data = await LearningModuleService.getLearningModuleById(id);
          const number = (await LearningModuleService.getLearnerInAClass(id));
          const tutor = await UserDetailService.getUserById(data.tutorId);
          setLearningModule(data)
          setNumber(number)
          setTutor(tutor)
        }
       
      } catch (error) {
        console.error("Error fetching learning module:", error);

      }
    };
    viewLearningModuleDetail(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []); // [] đảm bảo hàm chỉ chạy một lần sau khi component được render
  return (
    <>
      <div data-aos="zoom-in-left" data-aos-duration="1000">

        <div className="py-3 px-4 mx-auto max-w-4xl lg:py-5">
          <div className=" mx-auto py-2 mb-5 text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">{learningModule?.title}</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{learningModule?.description} </p>
          </div>
          <div className="gap-10 mb-10" style={{ display: 'flex', height: '60vh' }}>

            <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'center' }}>
              <div className="flex flex-col gap-5">
                <div>

                  <div style={{ width: '300px' }} className="bg-transparent hover:bg-sky-400 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                    Subject: {getSubjectString(learningModule?.subject)}  - Grade Level: {learningModule?.gradeLevel}
                  </div>
                </div>
                <div><div style={{ width: '300px' }} className="bg-transparent hover:bg-sky-400  text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                  Price: {learningModule?.price} VND
                </div>
                </div>
                <div><div style={{ width: '300px' }} className="bg-transparent hover:bg-sky-400  text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                  Learners: {number}/{learningModule?.maximumLearners}
                </div></div>
                <div><div style={{ width: '300px' }} className="bg-transparent hover:bg-sky-400  text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                  Duration: {learningModule?.duration} minutes/ session
                </div>
                </div>
                <div><div style={{ width: '300px' }} className="bg-transparent hover:bg-sky-400  text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                  <div>Start Date: {learningModule?.startDate}</div>
                  <div>End Date: {learningModule?.endDate}</div>
                </div>
                </div>
                <div style={{ width: '300px' }} className="relative bg-transparent hover:bg-sky-400 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-500 w-[25px] h-[25px] rounded-full text-white text-center text-sm">by</div>
                  <button onClick={() => navigate("/tutordetail", { state: tutor?.id })}>

                 
                  <div className="flex gap-5">
                    <img width={50} height={50} src="https://www.theventuretours.com/wp-content/uploads/2020/03/avatar-icon-png-1-1024x1024.png" />
                    <div>
                      <h1>{learningModule?.tutor?.displayName}</h1>
                      <h2>{tutor?.displayName}</h2>
                    </div>
                  </div>
                  </button>

                </div>
              </div>
            </div>
            <div style={{ flex: '2 1 0' }}>
              <video className="w-full border-2 rounded-md border-indigo-300	" autoPlay muted controls style={{ height: '75%' }}>
                <source src="src/assets/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="text-center mt-3 mb-4 font-bold leading-none tracking-tight text-black text-2xl dark:text-white">Class <mark className="px-2 text-white bg-sky-300 rounded dark:bg-blue-500">trailer</mark> </h3>
              <div className="flex justify-center mt-6">

                {appUser?.tutor == null ? (
                  <>
                    <button
                      type="button"
                      className="mx-auto text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 w-[35%] py-2.5 text-center mb-2"

                    >
                      Request enroll class
                    </button>
                    <button
                      type="button"
                      className="mx-auto text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 w-[35%] py-2.5 text-center mb-2"
                    >
                      Free Session
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="mx-auto text-white bg-sky-400 hover:bg-sky-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 w-[35%] py-2.5 text-center mb-2"
                    >
                      Update Information
                    </button>

                  </>
                )}

              </div>
            </div>
          </div>






        </div>
      </div>
    </>
  );
}
