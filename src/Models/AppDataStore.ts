import { get, Readable, writable } from 'svelte/store' 
import { AppData, InOfficeAvailable, User } from './Models';
import type { AppNavigationType } from './Types';

function createAppData()
{ 
    // todo: get the data from a service
    var data = new AppData({ name: 'Hank'},  [
        new InOfficeAvailable(new Date(2020, 9, 5), ['Mike', 'Walter', 'Elly', 'Chris']),
        new InOfficeAvailable(new Date(2020, 9, 6), ['Walter', 'Dilbert']),
        new InOfficeAvailable(new Date(2020, 9, 7), ['Oscar', 'Jane', 'Hank']),
        new InOfficeAvailable(new Date(2020, 9, 8), ['Ahmed', 'Jane', 'Walter', 'Mike'])]
    );     

    const store = writable<AppData>(data);
    const { subscribe, set, update} = store;    

    return { 
        data,
        subscribe, 
        set,
        update,
        removeAvailability(user: User, date: Date) {
            var data = get<AppData, Readable<AppData>>(store);
            const newAvailability = data.officeAvailability.find(x => x.date == date).persons.filter(x => x != user.name);
            data.officeAvailability.find(x => x.date == date).persons = newAvailability; 
            this.set(data);
        },    
        setAvailability(user: User, date: Date) {  
            var data = get<AppData, Readable<AppData>>(store);
            const newAvailability = [ ... data.officeAvailability.find(x => x.date == date).persons, user.name]; 
            data.officeAvailability.find(x => x.date == date).persons = newAvailability; 
            this.set(data);
        },    
        setCurrentDayIndex(navigation: AppNavigationType) { 
            var data = get<AppData, Readable<AppData>>(store);
            switch (navigation)
            {
                case "prev":
                    if (data.currentDayIndex > 0) { 
                        data.currentDayIndex -= 1;
                    }
                    break;
                case "next":			
                    if (data.currentDayIndex + 1 < data.officeAvailability.length) { 
                        data.currentDayIndex += 1;
                    }	
                    break;
            }	
            this.set(data);
        }
    }
}
export const appData = createAppData();

appData.subscribe(value => {
     // Create ajax request to update the server or something like that
     console.log(value);
});
 