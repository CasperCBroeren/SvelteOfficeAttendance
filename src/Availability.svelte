<script lang="ts">    
    import { createEventDispatcher } from 'svelte';
    import type { InOfficeAvailable } from './Domain/Models';

    const dispatch = createEventDispatcher();

    function PreviousDay()
	{ 
		dispatch('index', 'prev');
	}
	
	function NextDay()
	{
		dispatch('index', 'next');	
	}
    
    export let currentDay: InOfficeAvailable = null;
</script>

<div>
    <span><button on:click={PreviousDay}>Prev</button></span>
    <span class="availableLabel">People availbe on {currentDay.date.toDateString()}</span>
	<span ><button on:click={NextDay}>Next</button></span>
	
	<ul class="personlist">
        {#each currentDay.persons as person}
            <li>{person}</li>
        
        {/each}
    </ul>
</div>

<style>
	 .personlist {
         list-style-type: none;  
         padding: 0;
         margin: 0;       
     }
     .personlist li {
         background-color: #ddd;
         
         border-radius: 10px;
         padding: 10px 0px;
         margin: 15px auto;
     } 
     
     .availableLabel
     {
        text-align: center;
        width: 350px;
        display: inline-block;
     }
</style>