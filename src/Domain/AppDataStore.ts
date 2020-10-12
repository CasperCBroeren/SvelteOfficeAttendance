import { get, Readable, writable } from 'svelte/store' 
import { AppData,  InOfficeAvailable,  User } from './Models';
import { AppNavigationType } from './Enums';
import { userData } from './UserDataStore';

function createAppData()
{   
    const dataUrl = 'http://localhost:64217/OfficeAttendance';
    const store = writable<AppData>(new AppData([] ));
    const { subscribe, set, update} = store;    

    return { 
        subscribe, 
        set,
        update,
        async loadServerData()
        {
            let response = await fetch(dataUrl, {
                method: 'GET', 
                redirect: 'follow',
                headers: {
                    Authorization: `Bearer ${await userData.getToken()}` 
                }
            });            
            let responseData = await response.json();          
            let newData  =  new AppData(responseData.officeAvailability.map(x => new InOfficeAvailable(new Date(x.date), x.persons))); 
            this.set(newData);            
        },
        removeAvailability(user: User, date: Date) {
            this._changeAvailability(user, date, (data, aUser, aDate) => {
                return data.officeAvailability.find(x => x.date == aDate).persons.filter(x => x != aUser.name)
            });
        },    
        setAvailability(user: User, date: Date) {  
            this._changeAvailability(user, date, (data, aUser, aDate) => {
                return [ ... data.officeAvailability.find(x => x.date == aDate).persons, aUser.name]; 
            });
        },          
        setCurrentDayIndex(navigation: AppNavigationType) { 
            let data = get<AppData, Readable<AppData>>(store);
            switch (navigation)
            {
                case AppNavigationType.Prev:
                    if (data.currentDayIndex > 0) { 
                        data.currentDayIndex -= 1;
                    }
                    break;
                case AppNavigationType.Next:			
                    if (data.currentDayIndex + 1 < data.officeAvailability.length) { 
                        data.currentDayIndex += 1;
                    }	
                    break;
            }	
            this.set(data);
        },
        _changeAvailability(user: User, date: Date, modifyFunction) {
            let data = get<AppData, Readable<AppData>>(store);
            const newAvailability = modifyFunction(data, user, date);
            data.officeAvailability.find(x => x.date == date).persons = newAvailability; 
            this.set(data);
            // TODO: send this to a server
            console.log('TODO: send mutation to server');
        }
    }
}
export const appData = createAppData(); 