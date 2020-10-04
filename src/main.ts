import App from './App.svelte'; 
const app = new App({
	target: document.body,
	props: {
		appData: {
			user: { name: 'Henk'},
			officeAvailability: [
				{date: new Date(2020, 9, 5), persons: ['Mike', 'Walter', 'Elly', 'Chris']},
				{date: new Date(2020, 9, 6), persons: ['Walter', 'Dilbert']},
				{date: new Date(2020, 9, 7), persons: ['Oscar', 'Jane', 'Henk']},
				{date: new Date(2020, 9, 8), persons: ['Achmed', 'Jane', 'Walter', 'Mike']}
			],
			currentDayIndex: 0
		}
	}
});

export default app;