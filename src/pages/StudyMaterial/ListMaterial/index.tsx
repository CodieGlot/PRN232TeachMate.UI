import { useEffect, useState } from "react";
import { Header } from "../../../layouts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService, LearningMaterialService, PaymentService } from "../../../services";
import { LearningChapter, LearningMaterial } from "../../../interfaces";
import { UserRole } from "../../../common/enums";
import styles from './material.module.css'
export function ListMaterial(): JSX.Element {
    const [listMaterial, setListMaterial] = useState<LearningMaterial[]>([])
    const [searchParams] = useSearchParams();
    const [list, setList] = useState<LearningChapter[]>([])
    const learningModuleId = searchParams.get("id")
    const navigate = useNavigate();
    const [openItemId, setOpenItemId] = useState(-1);
    const [chapterId, setChapterId] = useState(-1);
    const [isAddNewChapter, setIsAddNewChapter] = useState(false);
    const [chapterName, setChapterName] = useState("");
    const [chapterDesc, setChapterDesc] = useState("");
    const handleToggle = (itemId: number) => {
        setOpenItemId(openItemId === itemId ? -1 : itemId);
        setChapterId(itemId)
        fetchLearningMaterials();
        console.log(listMaterial);
    };
    const user = AuthService.getCurrentUser();


    const fetchLearningChapter = async () => {
        try {
            const data = await LearningMaterialService.getAllLearningChapterByModuleId(learningModuleId);
            setList(data);
        }
        catch (error) {
            console.error("Error fetching learning chapters:", error);
        }
    };

    useEffect(() => {
        checkViewPermission();
        fetchLearningChapter();
    }, []);

    const checkViewPermission = async () => {
        try {
            if (learningModuleId !== null) {
                const data = await PaymentService.checkPermissionToViewLearningModule(learningModuleId);
                setHavePermission(data);
            }
           
        }
        catch (error) {
            console.error("Error check permission", error);
        }
    }

    const fetchLearningMaterials = async () => {
        try {
            const data = await LearningMaterialService.getAllLearningMaterialByChapterId(chapterId);
            setListMaterial(data);
        }
        catch (error) {
            console.error("Error fetching learning materials:", error);
        }
    }

    const handleAddChapter = async () => {
        try {
            await LearningMaterialService.addLearningChapter({
                name: chapterName,
                description: chapterDesc,
                learningModuleId
            }
            )
            window.location.reload();
            navigate('/manage-class?id=' + learningModuleId + '&section=material')
        } catch (error) {
            console.error("Add learning chapter error:" + error);
        }
    }


    const [close, setClose] = useState<boolean>(false)
    const handleClosePayment = () => {
        setClose(true);
    }

    const [havePermission, setHavePermission] = useState<boolean>(false);

    return (
        <>
            <div className="min-h-screen">
                {/* <Header />
                <div className='min-h-[670px] flex  justify-center from-indigo-100 via-indigo-300 to-sky-500 bg-gradient-to-br'> */}
                {/* <div className='mt-10 mb-10 min-h-[200px] w-full px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'> */}
                <div className="mx-auto p-8 rounded-md w-5/6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-gray-600 font-semibold">Study material</h2>
                            <span className="text-xs">All study materials in class</span>
                        </div>
                        {user?.userRole == UserRole.TUTOR && (
                            <button
                                className="mt-5 inline-flex items-center px-4 py-2 bg-sky-600 transition ease-in-out delay-75 hover:bg-sky-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                onClick={() => setIsAddNewChapter(!isAddNewChapter)}
                            >


                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                Add new chapter
                            </button>)}

                    </div>
                    {isAddNewChapter && (
                        <div className="mt-10 max-w-lg mx-auto relative flex flex-col p-4 rounded-md text-black bg-white">
                            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Add new learning <span className="text-[#7747ff]">Chapter</span></div>
                            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Fill in these field</div>
                            <form className="flex flex-col gap-3">
                                <div className="block relative">
                                    <label htmlFor="chapterName" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Enter chapter name *</label>
                                    <input
                                        placeholder="We suggest [Chapter 01: Abc]"
                                        required
                                        type="text" id="chapterName" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                                        value={chapterName}
                                        onChange={(e) => setChapterName(e.target.value)} />

                                </div>
                                <div className="block relative">
                                    <label htmlFor="chapterDescription" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Enter chapter description</label>
                                    <textarea rows={10} id="chapterDescription" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                                        value={chapterDesc}
                                        onChange={(e) => setChapterDesc(e.target.value)} />

                                </div>
                                {user?.userRole == UserRole.TUTOR && (
                                    <button type="button" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
                                        onClick={handleAddChapter}
                                    >Add</button>
                                )}

                            </form>
                        </div>)}
                    <div className=' mx-auto space-y-6 relative mt-5'>
                        {(!close && !havePermission) && 
                        (<div className={styles["payment-reminder"]}>
                            <div
                                className="flex flex-col items-center bg-white w-80 h-auto pt-5 pb-7 border border-gray-200 rounded-lg space-y-8"
                            >
                                <section className="flex flex-col text-center space-y-1">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Payment request
                                    </h2>
                                    <p className="text-slate-500 text-sm">You need to pay for this class to see learning material</p>
                                </section>
                                <section className="flex w-full flex-col space-y-2 px-9">
                                    <button
                                        className="py-3 font-medium tracking-wide capitalize transition-colors duration-300 transform bg-gray-100 rounded-md hover:bg-gray-200 text-sm text-gray-600"
                                        onClick={() => navigate('/enroll-class?id='+learningModuleId+'&section=payment')}
                                    >
                                        Pay now
                                    </button>
                                    <button
                                        className="py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600"
                                        onClick={() => handleClosePayment()}
                                    >
                                        Close
                                    </button>
                                </section>
                            </div>
                        </div>
                            )
                        }
                        

                        <div className={havePermission ? '' : styles["content-to-blur"]}>
                      
                            <p className='text-gray-600'></p>
                            {list.map((item) => (
                                <div key={item.id}>
                                    <div
                                        onClick={() => handleToggle(item.id)}
                                        className='flex items-center text-gray-600 w-full border-b overflow-hidden mt-32 md:mt-0 mb-5 mx-auto cursor-pointer'
                                    >
                                        <div className={`w-10 border-r px-2 transform transition duration-300 ease-in-out ${openItemId === item.id ? 'rotate-90' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                        <div className='flex items-center px-2 py-3'>
                                            <div className='mx-3'>
                                                <button className="hover:underline font-bold font-serif">{item.name}</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`flex p-5 md:p-0 w-full transform transition-all duration-500 ease-in-out ${openItemId === item.id ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                                        <p className={`text-gray-500 dark:text-gray-400 transition-opacity duration-500 ease-in-out ${openItemId === item.id ? 'opacity-100' : 'opacity-0'}`}>
                                            {item.description}
                                            <div className="px-5 py-4">
                                                <ul>
                                                    {item.learningMaterials.map((itemMaterial) => (
                                                        <li className="flex gap-3 items-center" key={itemMaterial.id}>
                                                            <a href={itemMaterial.linkDownload} className="flex gap-5">
                                                                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z" fill="#000000"></path></g>
                                                                </svg>
                                                                {itemMaterial.displayName}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    {user?.userRole == UserRole.TUTOR && (
                                                        <button
                                                            className="mt-5 inline-flex items-center px-4 py-2 bg-sky-600 transition ease-in-out delay-75 hover:bg-sky-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                                            onClick={() => navigate('/upload-material', { state: { chapterId: item.id, learningModuleId: learningModuleId } })}

                                                        >

                                                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                                            Upload
                                                        </button>
                                                    )}

                                                </ul>

                                            </div>
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}

        </>
    );
}

