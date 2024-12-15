import { User } from "./user.model";

export interface Driver{
    userId: string
    balance: number,
    licenseInfo: string,
    vehicles: { vehicleNo: string; vehicleModel: string }[];
    ratings: number;
    bankDetails: BankDetails;
}


export interface BankDetails {
    recipientName: string;
    accountNumber: number;
    routingNumber: string;
}