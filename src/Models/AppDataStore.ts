import { get, Readable, writable } from 'svelte/store' 
import axios from 'axios';
import { AppData,  InOfficeAvailable,  User } from './Models';
import type { AppNavigationType } from './Types';

function createAppData()
{  
    let data =  new AppData(null,  [] );     
    
    const store = writable<AppData>(data);
    const { subscribe, set, update} = store;    

    return { 
        data,
        subscribe, 
        set,
        update,
        async loadServerData()
        {
            let response = await fetch('https://api.npoint.io/699628d06ae01739b275');            
            let responseData = await response.json();
            // this is odd as hell
            console.log(responseData.officeAvailability[0].date + ' = ' + typeof( responseData.officeAvailability[0].date));
          
            var newData  =  new AppData(responseData.user, 
                                    responseData.officeAvailability.map(x => new InOfficeAvailable(new Date(x.date), x.persons))); 
            this.set(newData);            
        },
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
 
});
 