<script lang="ts">
	import { appData } from "../Domain/AppDataStore";
	import { userData } from "../Domain/UserDataStore";
	import { fade } from "svelte/transition";

	import Availability from "./Common/Availability.svelte";
	import AppButton from "./Common/Button.svelte";
	import Header from "./Common/Header.svelte";

	function workingAtHome(): void {
		appData.removeAvailability($userData.user, currentDay.date);
	}

	function workingAtOffice(): void {
		appData.setAvailability($userData.user, currentDay.date);
	}

	$: currentDayIndex = $appData.currentDayIndex;
	$: currentDay =
		$appData.officeAvailability.length == 0
			? null
			: $appData.officeAvailability[currentDayIndex];
	$: userIsIn =
		currentDay == null
			? false
			: currentDay.persons.indexOf($userData.user.name) > 0;
</script>

<style>
	.status {
		color: #ff3e00;
		font-style: italic;
		padding: 10px 0;
	}
</style>

<section in:fade>
	<Header>Hello {$userData.user.given_name}!</Header>
	<div>If you want to come to the office, please register</div>
	{#if $appData.officeAvailability.length > 0}
		{#if !userIsIn}
			<div class="status">
				I'm at working at
				<b>home</b>
				on
				{currentDay?.date.toDateString()}
			</div>
			<AppButton on:click={workingAtOffice}>Come to office</AppButton>
		{:else}
			<div class="status">
				I'm at the
				<b>office</b>
				on
				{currentDay.date.toDateString()}
			</div>
			<AppButton on:click={workingAtHome}>Stay at home</AppButton>
		{/if}
		<Availability bind:currentDay />
	{/if}
</section>
