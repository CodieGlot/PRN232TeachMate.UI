import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Feedback } from "../../../interfaces/Feedback/Feedback";
import { AuthService, FeedbackService } from "../../../services";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Reply } from "../../../interfaces/Feedback";
import { UserRole } from "../../../common/enums";

export function ReceiveFeedback() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<{ [key: string]: boolean }>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = AuthService.getCurrentUser();
  // Function to toggle visibility of the reply box for a specific feedback
  const handleReplyClick = (feedbackId: string) => {
    setShowCommentBox(prevState => ({
      ...prevState,
      [feedbackId]: !prevState[feedbackId]
    }));
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const formattedDate = format(date, 'dd/MM/yyyy', { locale: vi });
    const formattedTime = format(date, 'HH:mm:ss', { locale: vi });
    return `${formattedDate}, ${formattedTime}`;
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        if (id) {
          const fetchedFeedbacks = await FeedbackService.getFeedbackByLearningModuleId(id);
          setFeedbacks(fetchedFeedbacks);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  });

  useEffect(() => {
    const fetchReplies = async (feedbackId: string) => {
      try {
        const fetchedReply = await FeedbackService.getReplyByFeedbackId(feedbackId);
        const replyExists = replies.some(reply => reply.id === fetchedReply.id);
        if (!replyExists) {
          setReplies(prevReplies => [...prevReplies, fetchedReply]);
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    feedbacks.forEach(feedback => {
      fetchReplies(feedback.id.toString());
    });
  }, [feedbacks]);

  const handleInput = () => {
    if (textareaRef.current) {
      // Reset the height to auto to shrink the textarea when necessary
      textareaRef.current.style.height = 'auto';
      // Set the height to the scrollHeight to expand the textarea
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const [replyContent, setReplyContent] = useState("");
  const handleReply = async (id: number) => {
    try {
      await FeedbackService.tutorReplyFeedback({
        learningModuleFeedbackId: id,
        replyContent,
      })
    } catch (err) {
      console.log("Reply fail" + err)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-gray-600 font-semibold">Reviews Feedbacks</h1>

      <div className="flex flex-col gap-6 mt-8">
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <div key={feedback.id} className="rounded-lg shadow-md">
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Profile"
                      />
                      {feedback.appUser.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime={feedback.createdAt} title={formatDateTime(feedback.createdAt)}>
                        {formatDateTime(feedback.createdAt)}
                      </time>
                    </p>
                  </div>
                  <button
                    id={`dropdownComment${feedback.id}Button`}
                    data-dropdown-toggle={`dropdownComment${feedback.id}`}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  <div id={`dropdownComment${feedback.id}`} className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownComment${feedback.id}Button`}>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 dark:text-gray-400">{feedback.comment}</p>
                  <p className="text-yellow-300 dark:text-yellow-300">
                    {Array(feedback.star).fill(null).map((_, index) => (
                      <svg key={index} className="w-4 h-4 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </p>
                </div>
                {user?.userRole == UserRole.TUTOR && (
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                      onClick={() => handleReplyClick(feedback.id.toString())}
                    >
                      <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                      </svg>
                      Reply
                    </button>
                  </div>
                )}


                {/* Render replies for this feedback */}
                {feedback.tutorReplyFeedback ? (
                  <article key={feedback.tutorReplyFeedback.id} className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Profile"
                          />
                          {feedback.tutorReplyFeedback.replier.displayName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time dateTime={feedback.tutorReplyFeedback.replyDate} title={formatDateTime(feedback.tutorReplyFeedback.replyDate || "2024-09-08")}>
                            {formatDateTime(feedback.tutorReplyFeedback.replyDate || "2024-09-28")}
                          </time>
                        </p>
                      </div>
                      <button
                        id={`dropdownComment${feedback.tutorReplyFeedback.id}Button`}
                        data-dropdown-toggle={`dropdownComment${feedback.tutorReplyFeedback.id}`}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                      <div id={`dropdownComment${feedback.tutorReplyFeedback.id}`} className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownComment${feedback.tutorReplyFeedback.id}Button`}>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">{feedback.tutorReplyFeedback.replyContent}</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button onClick={() => handleReplyClick(feedback.id.toString())} type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </article>
                ) : (
                  showCommentBox[feedback.id.toString()] && (
                    <form className="ml-3 lg:ml-12 w-full p-4 rounded">
                      <div className="mb-4 col-span-1 md:col-span-3">
                        <textarea
                          id="comment"
                          name="comment"
                          className="ml-12 w-4/5 h-20 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none overflow-hidden"
                          placeholder="Comment...*"
                          rows={3.5}
                          required
                          ref={textareaRef}
                          onInput={handleInput}
                          onChange={(e) => setReplyContent(e.target.value)}
                        ></textarea>
                        <button
                          type="button"
                          onClick={() => handleReply(feedback.id)}
                          className="ml-12 py-2 px-2 bg-blue-950 text-white rounded-sm bg-gradient-to-r to-indigo-600 from-sky-400"

                        >
                          Post Comment →
                        </button>
                      </div>
                    </form>
                  )
                )}
              </article>
            </div>
          ))
        ) : (
          <p>No feedback found for this learning module.</p>
        )}
      </div>
    </div >
  );
}
