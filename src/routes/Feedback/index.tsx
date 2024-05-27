import { DisplayFeedbackForLearner, GiveFeedback, ReceiveFeedback } from "../../pages";

const feedbackRoutes = [
  {
    path: "/givefeedback",
    element: <GiveFeedback />
  },
  {
    path: "/receivefeedback",
    element: <ReceiveFeedback />
  },
  {
    path: "/displayfeedbackforlearner",
    element: <DisplayFeedbackForLearner />
  }

];

export default feedbackRoutes;