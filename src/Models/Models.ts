import type { AppNavigationType } from "./Types";

export class InOfficeAvailable  {
    date: Date;
    persons: Array<string>;

    constructor(date: Date, persons: Array<string>)
    {
        this.date = date;
        this.persons = persons;
    }
}

export interface User {
    name: string;
}

export class AppData  {

    user: User;
    officeAvailability: Array<InOfficeAvailable>;
    currentDayIndex: number;

    constructor(user: User, availability: Array<InOfficeAvailable>)    {
        this.user = user;
        this.officeAvailability  = availability;
        this.currentDayIndex = 0;
    }
     
   
}