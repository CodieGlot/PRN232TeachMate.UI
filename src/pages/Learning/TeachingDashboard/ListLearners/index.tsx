
// import { RequestStatus } from "../../../../common/enums";
import { useEffect, useState } from "react";
import { LearningModuleService } from "../../../../services/LearningModuleService";
import { useSearchParams } from "react-router-dom";
import { Learner } from "../../../../interfaces";
import styles from "../ListLearners/kickButton.module.css"
import ConfirmModal from "../../../Modal";
export function LearnersInClass() {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const [learners, setLearners] = useState<Learner[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        if (id) {
          const learners = await LearningModuleService.getAllLearnersInLearningModule(id);
          setLearners(learners);
        }
      } catch (error) {
        console.error('Error fetching learners:', error);
      }
    };
    fetchLearners();
  }, []);
  const handleRemoveLearner = async (learnerID: string) => {
    try {

      await LearningModuleService.removeLearner({
        learnerID,
        moduleID: Number.parseInt(id || ""),
      })
      window.location.reload();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error(error)
    }

  }

  // const handleAccept = async (moduleId: number, requestId: number) => {
  //   try {
  //     const request = await LearningModuleService.updateRequestStatus(
  //       {learningModuleId: moduleId,
  //       learningRequestId: requestId,
  //       status: RequestStatus.Approved,
  //       }
  //     )
  //     window.location.reload();
  //   } catch (err) {
  //     console.error('Error fetching accept requests:', err);

  //   }

  // }
  // const handleReject = async (moduleId: number, requestId: number) => {
  //   try {
  //     const request = await LearningModuleService.updateRequestStatus(
  //       {learningModuleId: moduleId,
  //       learningRequestId: requestId,
  //       status: RequestStatus.Rejected,
  //       }
  //     )
  //     window.location.reload();
  //   } catch (err) {
  //     console.error('Error fetching accept requests:', err);

  //   }
  // }

  return (
    <>

      <div className="mx-auto p-8 rounded-md w-5/6">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Learners</h2>
            <span className="text-xs">All learners in class</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
              <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
            </div>
            <div className="lg:ml-40 ml-10 space-x-8">
            </div>
          </div>
        </div>
        <div>
          {learners.length > 0 ? (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Grade Level
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {/* Created at */}
                        Remove
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {learners.map(learner => (
                      <tr key={learner.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">{learner.displayName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-semibold">{learner.gradeLevel}</p>
                        </td>



                        {/* <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${getStatusClasses(request.status)}`}>
                            <span
                              className={`absolute inset-0 opacity-50 rounded-full ${getStatusBackgroundClasses(request.status)}`}
                              aria-hidden="true"
                            ></span>
                            <span className="relative">{getStatusString(request.status)}</span>
                          </span> */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            role="button" className={styles["button-name"]}>X</button>
                        </td>
                        <ConfirmModal
                          title="Remove learner"
                          message="Do you actually remove this learner ?"
                          open={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          onConfirm={() => handleRemoveLearner(learner.id)}
                        />

                        {/* <p className="flex gap-1 text-gray-900 whitespace-no-wrap">
    {request.status === RequestStatus.Waiting && (
      <>
        <button onClick={() => handleAccept(request.learningModuleId, request.id)}>
          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-800">
            <span className="absolute inset-0 opacity-50 rounded-full bg-green-200" aria-hidden="true"></span>
            <span className="relative">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/?size=100&id=21068&format=png&color=000000"
                alt="unfriend-female"
              />
            </span>
          </span>
        </button>
        <button onClick={() => handleReject(request.learningModuleId, request.id)}>
          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-800">
            <span className="absolute inset-0 opacity-50 rounded-full bg-red-200" aria-hidden="true"></span>
            <span className="relative">
              <img
                width="19"
                height="19"
                src="https://img.icons8.com/?size=100&id=21066&format=png&color=000000"
                alt="unfriend-female"
              />
            </span>
          </span>
        </button>
      </>
    )}
  </p> */}


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No requests found for this learning module.</p>
          )}

          <div
            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              &nbsp; &nbsp;
              <button
                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
