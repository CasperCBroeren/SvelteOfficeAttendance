import App from './App.svelte'; 
const app = new App({
	target: document.body,
	props: {
		user: { name: 'Henk'},
		officeAvailability: [
			{date: new Date(2020, 9, 5), persons: ['Test1', 'Test3']},
			{date: new Date(2020, 9, 6), persons: ['Test1', 'Test2']},
			{date: new Date(2020, 9, 7), persons: ['Test3', 'Boo', 'Henk']},
			{date: new Date(2020, 9, 8), persons: ['Test3', 'Boo', 'Test1', 'Test2']}
		]
	}
});

export default app;