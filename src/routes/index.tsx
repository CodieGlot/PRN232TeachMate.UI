import { useRoutes } from "react-router-dom";
import { Home, NotFound } from "../pages";
import authRoutes from "./Auth";
import learningRoutes from "./Learning";
// import chatRoutes from "./Chat";
import profileRoutes from "./Profile";
import scheduleRoutes from "./Schedule";
import searchRoutes from "./Search";
import feedbackRoutes from "./Feedback"
import adminRoutes from "./Admin"
import contactRoutes from "./Contact";
import forumRoutes from "./Forum";
import materialRoutes from "./Material";
import paymentRoutes from "./Payment";
import certificateRoutes from "./Certificate";
import { Intro } from "../pages/Intro";

const Route = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    ...authRoutes,
    ...learningRoutes,
    // ...chatRoutes,
    ...profileRoutes,
    ...scheduleRoutes,
    ...searchRoutes,
    ...feedbackRoutes,
    ...adminRoutes,
    ...contactRoutes,
    ...forumRoutes,
    ...materialRoutes,
    ...paymentRoutes,
    ...certificateRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "demo",
      element: <Intro />,
    },

  ]);

  return routes;
};

export default Route;
