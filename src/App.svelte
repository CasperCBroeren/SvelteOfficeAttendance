<svelte:head>
	<title>Office attendence</title> 
	<html lang="en" />
</svelte:head>

<script lang="ts">
	import Availability from './Availability.svelte'; 
	import type { InOfficeAvailable } from './Models/InOfficeAvailable';
	export let user: any;
	export let officeAvailability: Array<InOfficeAvailable>; 
	
	let index: number = 0; 	

	function handleIndex(event)
	{
		if (event.detail == "prev")
		{
			if (index > 0) { 
				index -= 1;
			}
		}
		if (event.detail == "next")
		{
			if (index+1 < officeAvailability.length) { 
				index += 1;
			}	
		}	
	}
	
	function workingAtHome()
	{
		currentDay.persons.splice(currentDay.persons.indexOf(user.name), 1);
		currentDay.persons = currentDay.persons;
	}

	function workingAtOffice()
	{ 		
		currentDay.persons.push(user.name);
		currentDay.persons = currentDay.persons;
	}
	$: currentDay = officeAvailability[index];
	$: userIsIn = currentDay.persons.indexOf(user.name) > 0;
</script>

<main>
	<h1>Hello {user.name}!</h1>
	<div>If you want to come to the office, please register</div>
 
		{#if !userIsIn}
			<div class="status" >I'm at working at home on {currentDay.date.toDateString()}</div>
			<button on:click={workingAtOffice}>Come to office</button>
		{/if}
		{#if userIsIn}
		<div class="status" >I'm at the office  on {currentDay.date.toDateString()}</div>
		<button on:click={workingAtHome}>Stay at home</button>
		{/if}		 
 
	<Availability bind:currentDay={currentDay} on:index={handleIndex}></Availability>
</main>

<style>
	:global(body) {
		padding: 0;
		margin: 0;		
		background-color: #ccc;
	}
	main {
		text-align: center;		
		max-width: 500px;
		margin: 0 auto;
		height: 100%;
		padding: 30px 10px 0px 10px;		
		background-color: #fff;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
		margin-top: 0px;
		
	} 
	.status {
		color:  #ff3e00;
		font-style: italic;
		padding: 10px 0;
	}
</style>