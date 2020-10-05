<svelte:head>
	<title>Office attendance</title> 
	<html lang="en" />
</svelte:head>

<script lang="ts">
	import Availability from './Availability.svelte'; 
	import {appData} from './Models/AppDataStore';
	import OfficeButton from './Button.svelte';
 		 
	function workingAtHome() : void
	{				
		appData.removeAvailability($appData.user, $appData.currentDayIndex.toString());	
	}

	function workingAtOffice() : void
	{	 
		appData.setAvailability($appData.user, $appData.currentDayIndex.toString());
	}

	
	$: currentDayIndex = $appData.currentDayIndex;
	$: currentDay = $appData.officeAvailability[currentDayIndex];
	$: userIsIn = currentDay.persons.indexOf($appData.user.name) > 0;
	 
</script>

<main>
	<h1>Hello {$appData.user.name}!</h1>
	<div>If you want to come to the office, please register</div>
 
		{#if !userIsIn}
			<div class="status" >I'm at working at <b>home</b> on {currentDay.date.toDateString()}</div>
			<OfficeButton on:click={workingAtOffice}>Come to office</OfficeButton>
		{:else}
			<div class="status" >I'm at the <b>office</b> on {currentDay.date.toDateString()}</div>
			<OfficeButton on:click={workingAtHome}>Stay at home</OfficeButton>
		{/if}		 
 
	<Availability bind:currentDay={currentDay}></Availability>
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