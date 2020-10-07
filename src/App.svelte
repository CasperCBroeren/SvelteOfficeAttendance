<svelte:head>
	<title>Office attendance</title> 
	<html lang="en" />
</svelte:head>

<script lang="ts">
	import Home from './Views/Home.svelte';   
	import PersonalOverview from './Views/PersonalOverview.svelte';   
	import Navigation from './Views/Navigation.svelte';
	
	let currentPanel = window.location.hash != '' ? window.location.hash.substring(1) : 'home'  ;

	function navigation(event)
	{
		currentPanel = event.detail;
	}
</script>

<main>	
	<Navigation on:navigate={navigation}></Navigation>
	{#if currentPanel == 'home'}
		<Home></Home> 
	{:else if currentPanel == 'personal'}
		<PersonalOverview></PersonalOverview>
	{/if}
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
		height: calc(100% - 50px);
		padding: 50px 10px 0px 10px;		
		background-color: #fff;
	}


</style>