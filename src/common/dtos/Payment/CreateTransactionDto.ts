import { PaymentProviderType } from "../../enums";

export interface CreateTransactionDto {
    amount: number;
    paymentGateway: PaymentProviderType;
    learningModulePaymentOrderId: number;
}