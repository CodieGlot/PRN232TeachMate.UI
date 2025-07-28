import { SearchTutor, SearchClass, SearchCategory, TutorDetail } from "../../pages";

const searchRoutes = [
  {
    path: "/searchClass",
    element: <SearchClass searchQuery="" />,
  },
  {
    path: "/searchTutor",
    element: <SearchTutor searchQuery="" />,
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