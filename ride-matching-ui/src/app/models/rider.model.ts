import { User } from "./user.model";

export interface Rider{
    userId: string,
    bookings: string[],
    cardDetails: CardDetails
}

export interface CardDetails {
    cardNumber: number;
    expiryDate: string;
    securityCode: number;
    cardHolderName: string;
}