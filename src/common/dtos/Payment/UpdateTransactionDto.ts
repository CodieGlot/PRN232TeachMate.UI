export interface UpdateTransactionDto {
    amount: number;
    bankCode: string;
    cardType: string;
    orderInfo: string;
    payDate: string;
    responseCode: string;
    tmnCode: string;
    transactionNo: string;
    transactionStatus: string;
    txnRef: string;
    secureHash: string;
}