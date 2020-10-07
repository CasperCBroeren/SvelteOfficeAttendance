<script lang="ts">
    import Header from './Common/Header.svelte';
    import AppButton from '../Views/Common/Button.svelte'; 

    import {appData} from '../Models/AppDataStore';
    import type { InOfficeAvailable } from '../Models/Models'; 
    

    function personalDaysReducer(inofficePerDay: InOfficeAvailable)
    {
        return (inofficePerDay.persons.indexOf($appData.user.name) > 0)        
    }

    function removeAll()
    {
        personalDates.forEach(day => {
            appData.removeAvailability($appData.user, day.date);	
        });
    }

    function removeOne(date:Date)
    {
        appData.removeAvailability($appData.user, date);	
    }

    $: personalDates = $appData.officeAvailability.filter(personalDaysReducer);
</script>
<section>
    <Header>Personal overview</Header>
    {#if personalDates.length > 0}
    <p>On these are the days you are in office </p>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th><AppButton on:click={removeAll}>Remove all</AppButton></th>
            </tr>
        </thead>
        <tbody>
        {#each personalDates as date}
            <tr>
                <td>{date.date.toDateString()} and {date.persons.length -1 } other persons</td>
                <td><AppButton on:click={() => removeOne(date.date)}>Remove</AppButton></td>
            </tr>
        {/each}
        </tbody>
    </table>
    {:else}
        <p>You don't have any days registered that you come to the office</p>
    {/if}
</section>

<style>
	table {
        width: 100%;
        border-spacing: 0;
    }
    thead {
        background-color: #892200;
        color: #fff;
        font-weight: bold;
        
    }
    thead th {
        padding-top: 10px;
    }
    tbody td {
        border-bottom: 1px solid #892200;
        padding: 10px 0px;
    }

</style>