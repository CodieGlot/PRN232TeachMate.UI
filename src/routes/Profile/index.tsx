import { AddTutorDetail, Profile } from "../../pages";
import { AddLearnerDetail } from "../../pages/Profile/AddLearnerDetail";
import { UpdateLearnerDetail } from "../../pages/Profile/UpdateLearnerDetail";
import { UpdateTutorDetail } from "../../pages/Profile/UpdateTutorDetail";
const profileRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/add-tutor-detail",
    element: <AddTutorDetail/>
  },
  {
    path: "/add-learner-detail",
    element: <AddLearnerDetail/>
  },
  {
    path: "/update-tutor-detail",
    element: <UpdateTutorDetail/>
  },{
    path: "/update-learner-detail",
    element: <UpdateLearnerDetail/>
  }


];

export default profileRoutes;