export type Bid = {
    _id?: string;
    userId: string;
    bidUser: string;
    userEmail: string;
    itemName: string;
    startPrice: number;
    timeWindow: number;
    currentPrice?: number;
    dueDate: Date;
    timeStamp: Date
}