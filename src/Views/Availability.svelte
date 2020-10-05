<script lang="ts">    
    
    import OfficeButton from './Button.svelte';
    import type { InOfficeAvailable } from '../Models/Models';  
    import {appData} from '../Models/AppDataStore';

    function PreviousDay()
	{ 
		appData.setCurrentDayIndex('prev');
	}
	
	function NextDay()
	{
		appData.setCurrentDayIndex('next');
	}
    
    export let currentDay: InOfficeAvailable = null;
</script>

<div>
    <span><OfficeButton on:click={PreviousDay}>Prev</OfficeButton></span>
    <span class="availableLabel">People availbe on {currentDay.date.toDateString()}</span>
	<span ><OfficeButton on:click={NextDay}>Next</OfficeButton></span>
	
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
        width: 59%;
        display: inline-block;
     }
</style>