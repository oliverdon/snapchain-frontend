export class Photo {
    _id: string;
    live: boolean;
    date: Date;
    creator: {
        _id: string;
        hw: string;
    }
}
