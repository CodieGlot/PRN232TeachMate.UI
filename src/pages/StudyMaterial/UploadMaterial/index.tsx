import styles from "./upload.module.css"
import { Header } from "../../../layouts";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LearningMaterialService, StorageService } from "../../../services";
import toast from "react-hot-toast";
export function UploadMaterial() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [displayName, setDisplayName] = useState("");
    const location = useLocation();
    const { chapterId, learningModuleId } = location.state;
    const navigate = useNavigate();
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            //   const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            //   if (validTypes.includes(file.type)) {
            setSelectedFile(file);

            //   } else {
            // toast.error('Please upload a valid image file (JPEG, PNG, GIF)');
            //   }

        }
        console.log(selectedFile)
        console.log(chapterId)
    };

    const uploadStudyMaterial = async () => {
        try {
            if (selectedFile) {
                const linkDownload = await StorageService.uploadFile(selectedFile)

                const learningMaterial = await LearningMaterialService.uploadLearningMaterial(
                    {
                        linkDownload,
                        displayName,
                        learningChapterId: chapterId
                    }
                )
                console.log(learningMaterial)
                toast.success("Upload file successfully")

            }
        } catch (error) {
            console.error("Fail to upload: ", error)
        }
    }
    return (
        <>
            <Header />
            <div className=" ">
                <div className=" mx-auto py-2 mb-5 text-center">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400">Upload material page</span></h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Upload material</p>
                </div>
                <form className={styles.form}>

                    <p className="text-center">
                        File should be {"<"} 10MB
                    </p>
                    {/* <label htmlFor={styles["file-input"]} className={styles["drop-container"]}>
                        <span className={styles["drop-title"]}>Drop files here</span>
                        or
                        <input type="file" accept="image/*" required id={styles["file-input"]} onChange={loadFile} />
                    </label> */}
                    <div className="max-w p-5">
                        <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-700">Upload file</label>
                        <input id="example1" type="file" onChange={loadFile} className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-sky-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
                    </div>
                    <div className="w-full max-w p-5 bg-white rounded-lg font-mono">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unique-input"
                        >Display name</label>
                        <input
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Enter file name here"
                            type="text"
                            id="unique-input"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-10">
                        <button
                            type="button"
                            onClick={uploadStudyMaterial}
                            className="mx-auto mt-3 cursor-pointer group relative flex gap-1.5 px-7 py-3 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C12.2106 2.25 12.4114 2.33852 12.5535 2.49392L16.5535 6.86892C16.833 7.17462 16.8118 7.64902 16.5061 7.92852C16.2004 8.20802 15.726 8.18678 15.4465 7.88108L12.75 4.9318V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V4.9318L8.55353 7.88108C8.27403 8.18678 7.79963 8.20802 7.49393 7.92852C7.18823 7.64902 7.16698 7.17462 7.44648 6.86892L11.4465 2.49392C11.5886 2.33852 11.7894 2.25 12 2.25Z" fill="#ffffff"></path> </g></svg>
                            Upload

                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/manage-class?id=' + learningModuleId + '&section=material')}
                            className="mx-auto mt-3 cursor-pointer group relative flex gap-1.5 px-7 py-3 bg-sky-400 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                          
                            Go back

                        </button>
                        {/* <button
                            type="button"
                            className="bg-white mt-3 text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
                        >
                            <div
                                className="bg-sky-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500"
                                onClick={() => navigate('/manage-class?id=' + learningModuleId + '&section=material')}
                            >
                                <svg
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="#000000"
                                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                    ></path>
                                    <path
                                        fill="#000000"
                                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                    ></path>
                                </svg>
                            </div>
                            <p className="translate-x-2">Go Back</p>
                        </button> */}


                    </div>

                </form>
            </div>
        </>
    );
}