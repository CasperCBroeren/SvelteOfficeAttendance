<script lang="ts">
    import Header from './Common/Header.svelte';
    import {appData} from '../Models/AppDataStore';
    import type { InOfficeAvailable } from '../Models/Models'; 

    function personalDaysReducer(inofficePerDay: InOfficeAvailable)
    {
        return (inofficePerDay.persons.indexOf($appData.user.name) > 0)        
    }

    $: personalDates = $appData.officeAvailability.filter(personalDaysReducer);
</script>
<section>
    <Header>Personal overview</Header>
    <p>These are the days you are in office </p>
    <table>
        <thead>
            <tr>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
        {#each personalDates as date}
            <tr>
                <td>{date.date.toDateString()} and {date.persons.length -1 } other persons</td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>

<style>
	table {
        width: 100%;
    }
    thead {
        background-color: #892200;
        color: #fff;
        font-weight: bold;
    }
    tbody td {
        border-bottom: 1px solid #892200;
        padding: 10px 0px;
    }

</style>