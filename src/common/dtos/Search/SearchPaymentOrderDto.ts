import { PaymentStatus } from "../../enums";

export interface SearchPaymentOrderDto {
    hasClaimed: boolean | null;
    paymentStatus: PaymentStatus | null;
}