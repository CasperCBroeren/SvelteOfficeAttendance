<script lang="ts">
	import {appData} from '../Models/AppDataStore';
	import { fade } from 'svelte/transition';
	
	import Availability from './Common/Availability.svelte'; 
	import AppButton from './Common/Button.svelte';
	import Header from './Common/Header.svelte';
 		 
	function workingAtHome() : void
	{				
		appData.removeAvailability($appData.user, currentDay.date);	
	}

	function workingAtOffice() : void
	{	 
		appData.setAvailability($appData.user, currentDay.date);
	} 
	
	$: currentDayIndex = $appData.currentDayIndex;
	$: currentDay = $appData.officeAvailability.length == 0 
					? null 
					: $appData.officeAvailability[currentDayIndex] ;
	$: userIsIn = currentDay == null 
					? false 
					: currentDay.persons.indexOf($appData.user.name) > 0;
	 
</script>
<section in:fade>	
	<Header>Hello {$appData.user.name}!</Header>
	<div>If you want to come to the office, please register</div> 
	{#if $appData.officeAvailability.length >0}
		{#if !userIsIn}
			<div class="status" >I'm at working at <b>home</b> on {currentDay?.date.toDateString()}</div>
			<AppButton on:click={workingAtOffice}>Come to office</AppButton>
		{:else}
			<div class="status" >I'm at the <b>office</b> on {currentDay.date.toDateString()}</div>
			<AppButton on:click={workingAtHome}>Stay at home</AppButton>
		{/if}
		<Availability bind:currentDay={currentDay}></Availability>
	{/if}
</section>
<style>
	
	.status {
		color:  #ff3e00;
		font-style: italic;
		padding: 10px 0;
	}

</style>