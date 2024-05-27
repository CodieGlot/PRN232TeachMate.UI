import { PaymentProviderType } from "../../common/enums";
import { PaymentOrder } from "./PaymentOrder";

export interface Transaction {
    id: number;
    amount: number;
    bankCode: string;
    cardType: string;
    orderInfo: string;
    payDate: string | null;
    responseCode: string;
    tmnCode: string;
    transactionNo: string;
    transactionStatus: string;
    txnRef: string;
    secureHash: string;
    paymentGateway: PaymentProviderType;
    learningModulePaymentOrderId: number;
    learningModulePaymentOrder: PaymentOrder;
}
