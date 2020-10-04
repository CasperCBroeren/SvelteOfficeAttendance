export interface InOfficeAvailable  {
    date: Date;
    persons: Array<string>;

}

export interface User {
    name: string;
}

export interface AppData  {
    user: User;
    officeAvailability: Array<InOfficeAvailable>;
    currentDayIndex: number;
}