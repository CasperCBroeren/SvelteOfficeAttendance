<svelte:head>
	<title>Office attendance</title> 
	<html lang="en" />
</svelte:head>

<script lang="ts">
	import Home from './Views/Home.svelte';   
	import PersonalOverview from './Views/PersonalOverview.svelte';   
</script>

<main>	
	<Home></Home>
	 
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
		height: calc(100% - 30px);
		padding: 30px 10px 0px 10px;		
		background-color: #fff;
	}


</style>