import { AccountInformation, LearnerPayment, SetPrice } from "../../pages/Payment";
import PaymentNavigate from "../../pages/Payment/PaymentResult";


const paymentRoutes = [
  {
    path: "/setprice",
    element: <SetPrice />,
  },
  {
    path: "/learnerpayment",
    element: <LearnerPayment />,
  },
  {
    path: "/payment/success",
    element: <PaymentNavigate />,
  },
  {
    path: "/payment/add-account-info",
    element: <AccountInformation />,
  },
  
];

export default paymentRoutes;