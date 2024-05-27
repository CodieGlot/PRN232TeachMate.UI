import { AddWeeklySchedule, LearningSessionDetail, UserSchedule} from "../../pages";

const scheduleRoutes = [
  {
    path: "/add-weekly-schedule",
    element: <AddWeeklySchedule />,
  },
  {
    path: "/schedule",
    element: <UserSchedule />,
  },
  {
    path: "/session",
    element: <LearningSessionDetail/>
  }
];

export default scheduleRoutes;
