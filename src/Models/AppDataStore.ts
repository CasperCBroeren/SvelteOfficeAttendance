import { writable } from 'svelte/store' 
import type { AppData } from './Models';

export let appData = writable<AppData>({
    user: { name: 'Henk'},
    officeAvailability: [
        {date: new Date(2020, 9, 5), persons: ['Mike', 'Walter', 'Elly', 'Chris']},
        {date: new Date(2020, 9, 6), persons: ['Walter', 'Dilbert']},
        {date: new Date(2020, 9, 7), persons: ['Oscar', 'Jane', 'Henk']},
        {date: new Date(2020, 9, 8), persons: ['Achmed', 'Jane', 'Walter', 'Mike']}
    ],
    currentDayIndex: 0
});

appData.subscribe(value => {
     // Create ajax request to update the server or something like that
});
 