<script lang="ts">
	import Availability from './Availability.svelte'; 
	import {appData} from '../Models/AppDataStore';
	import AppButton from './Button.svelte';
 		 
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
<section>
	<h1>Hello {$appData.user.name}!</h1>
	<div>If you want to come to the office, please register</div>
	{#if !userIsIn}
		<div class="status" >I'm at working at <b>home</b> on {currentDay.date.toDateString()}</div>
		<AppButton on:click={workingAtOffice}>Come to office</AppButton>
	{:else}
		<div class="status" >I'm at the <b>office</b> on {currentDay.date.toDateString()}</div>
		<AppButton on:click={workingAtHome}>Stay at home</AppButton>
	{/if}
	<Availability bind:currentDay={currentDay}></Availability>
</section>
<style>
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