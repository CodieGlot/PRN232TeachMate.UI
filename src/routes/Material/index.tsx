import { ListMaterial, UploadMaterial } from "../../pages";

const materialRoutes = [
  {
    path: "/material",
    element: <ListMaterial />,
  },
  {
    path: "/upload-material",
    element: <UploadMaterial/>
  }
  // /upload-certificate


];

export default materialRoutes;