import { useLocation, useNavigate } from "react-router-dom";
import { AuthService, UserDetailService } from "../../../services";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import { Stepper } from "../Stepper";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
interface UpdateFormValues {
  displayName: string;
  email: string
  phoneNumber: string
  gradeLevel : number
}
import { StorageService } from "../../../services";
export function AddLearnerDetail() {
  const user = AuthService.getCurrentUser();

 


  const [avatar, setAvatar] = useState("https://i.pinimg.com/originals/ee/d1/76/eed176d5fb3f77e3e003b85a246ba7ad.jpg"); // Assuming the initial value is null // Assuming the initial value is null
  const accessToken = AuthService.getAccessToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .matches(/^[a-zA-Z0-9\s]*$/, "display name not have special symbols"),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/@gmail\.com$/, 'Email must end with @gmail.com'),
    phoneNumber: Yup.string()
      .matches(/^0\d{9}$/, 'Phone number must begin with 0 and be digits only, up to 10 characters'),
    gradeLevel : Yup.number()
    .required("Grade Level is required")
      .moreThan(9, "Grade Level must more than or equal 10")
      .lessThan(13, "Grade Level must less than or equal 12"),
  });
  const initialFormValues: UpdateFormValues = {
    displayName: user?.displayName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    gradeLevel : 0
  };

  useEffect(() => {
    AOS.init();
  }, []);
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // If you need to handle the file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        setImageSrc(URL.createObjectURL(file));
        setSelectedFile(file);

      } else {
        toast.error('Please upload a valid image file (JPEG, PNG, GIF)');
      }

    }
  };
  const [imageSrc, setImageSrc] = useState<string>("https://i.pinimg.com/originals/ee/d1/76/eed176d5fb3f77e3e003b85a246ba7ad.jpg");
  const [selectedFile, setSelectedFile] = useState<File>();


  const handleSaveClick = async (values: FormikValues,
    { setSubmitting }: FormikHelpers<UpdateFormValues>) => {

    try {
      // if (selectedFile) {
      //   const img = await StorageService.uploadFile(selectedFile)
      //   setAvatar(img)
      // }

      const { displayName, phoneNumber,gradeLevel } = values;
      await UserDetailService.addLearnerDetail({

        phoneNumber,
        displayName,
        avatar,
        gradeLevel
      }, accessToken);
      navigate("/Profile")
      window.location.reload();
    } catch (err) {
      console.error("Update Fail", err)
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


    // You can add additional logic here to save the edited email if needed
  };
  return (
    <>
      <Stepper />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-2xl lg:py-8">
          <div className=" mx-auto py-3 mb-5">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Add your details</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Add your details so anyone can know you</p>
          </div>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSaveClick}
          >
            {({ isSubmitting }) => (
              <Form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
                    <Field
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter display name"

                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="displayName"
                      component="div"
                    />
                  </div>
                  
                  <div className="w-full">
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                          <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                        </svg>
                      </div>
                      <Field
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0987654321"
                      />

                    </div>
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="phoneNumber"
                      component="div"
                    />
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>
                  </div>


                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img
                        id="preview_img"
                        className="h-16 w-16 object-cover rounded-full"
                        src={imageSrc}
                        alt="Current profile photo"
                      />
                    </div>
                    <label className="block ">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        onChange={loadFile}
                        className="block w-full text-sm text-slate-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade Level</label>
                    <Field
                      type="number"
                      name="gradeLevel"
                      id="gradeLevel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your grade level"
                      required
                      min={10}
                      max={12}
                    />
                    <ErrorMessage
                      className="text-red-500 p-5 bg-white font-medium text-xs"
                      name="gradeLevel"
                      component="div"
                    />
                  </div>
                  <div className="mt-10 flex p-4 text-sm text-gray-400 rounded-lg bg-gradient-to-r from-sky-400/20 to-indigo-600/20 h-full lg:w-full lg:ml-auto" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Ensure that these requirements are met:</span>
                      <ul className="mt-1.5 list-disc list-inside">
                        <li>You can only upload PNG, JPG, JPEG file</li>

                      </ul>
                    </div>
                  </div>

                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-black bg-gradient-to-r from-sky-400 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:from-sky-400 dark:to-indigo-600 dark:hover:from-sky-500 dark:hover:to-indigo-700 dark:focus:ring-indigo-800 border">
                    Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>

  );
}
