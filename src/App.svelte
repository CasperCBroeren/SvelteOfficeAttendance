<script lang="ts">
	import { appData } from "./Domain/AppDataStore";
	import { userData } from "./Domain/UserDataStore";

	import Home from "./Views/Home.svelte";
	import PersonalOverview from "./Views/PersonalOverview.svelte";
	import Credits from "./Views/Credits.svelte";
	import Navigation from "./Views/Navigation.svelte";

	let currentPanel =
		window.location.hash != "" ? window.location.hash.substring(1) : "home";
</script>

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
		height: calc(100% - 50px);
		padding: 50px 10px 0px 10px;
		background-color: #fff;
	}
</style>

<svelte:head>
	<title>Office attendance</title>
	<html lang="en" />
</svelte:head>
{#await userData.load()}
	<p>Please wait while checking authentication..</p>
{:then}
	{#if $userData.isAuthenticated}
		<main>
			{#await appData.loadServerData()}
				<p>Please wait while loading..</p>
			{:then}
				<Navigation
					on:navigate={(event) => (currentPanel = event.detail)} />
				{#if currentPanel == 'home'}
					<Home />
				{:else if currentPanel == 'personal'}
					<PersonalOverview />
				{:else if currentPanel == 'credits'}
					<Credits />
				{/if}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</main>
	{:else}
		{#await userData.login()}
			<p>Please wait while logging in..</p>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
{/await}
