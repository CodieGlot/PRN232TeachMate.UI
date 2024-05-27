import { CreateLearningModule, LearningDashboard, LearningModuleDetail, ListRequestLearner, ListRequestsForClass, RequestJoinLearningModule, TeachingDashboard } from "../../pages";
import { ListModule } from "../../pages/Learning/TeachingDashboard";
import { EnrollClass } from "../../pages/Learning/TeachingDashboard/ErollClass";
import { ManageClass } from "../../pages/Learning/TeachingDashboard/ManageClass";
import { UpdateLearningModule } from "../../pages/Learning/TeachingDashboard";

const learningRoutes = [
  {
    path: "/teaching",
    element: <TeachingDashboard />,
  },
  {
    path: "/manage-class",
    element: <ManageClass />,
  },
  {
    path: "/learning",
    element: <LearningDashboard />,
  },
  {
    path: "/list-learning-module",
    element: <ListModule />,
  },
  {
    path: "/create-learning-module",
    element: <CreateLearningModule />
  },
  {
    path: "/view-learning-module-detail",
    element: <LearningModuleDetail />
  },
  {
    path: "/update-learning-module-detail",
    element: <UpdateLearningModule />
  },
  {
    path: "/request-join",
    element: <RequestJoinLearningModule />
  },

  {
    path: "/list-request-class",
    element: <ListRequestsForClass />
  },
  {
    path: "/enroll-class",
    element: <EnrollClass />
  },
  {
    path: "/list-learner-request",
    element: <ListRequestLearner />
  },

 
];

export default learningRoutes;
