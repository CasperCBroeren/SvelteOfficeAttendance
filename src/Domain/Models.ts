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
    officeAvailability: Array<InOfficeAvailable>;
    currentDayIndex: number;

    constructor(availability: Array<InOfficeAvailable>)    { 
        this.officeAvailability  = availability;
        this.currentDayIndex = 0;
    }
     
   
}