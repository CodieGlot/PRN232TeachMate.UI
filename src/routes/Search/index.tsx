import { SearchTutor, SearchClass, SearchCategory, TutorDetail } from "../../pages";

const searchRoutes = [
  {
    path: "/searchClass",
    element: <SearchClass />,
  },
  {
    path: "/searchTutor",
    element: <SearchTutor />,
  },
  {
    path: "/search",
    element: <SearchCategory />
  },
  {
    path: "/tutordetail",
    element: <TutorDetail />
  },


];

export default searchRoutes;