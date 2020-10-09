<script lang="ts">
    import { fade } from "svelte/transition";
    import { appData } from "../Domain/AppDataStore";
    import { userData } from "../Domain/UserDataStore";
    import type { InOfficeAvailable } from "../Domain/Models";

    import Header from "./Common/Header.svelte";
    import AppButton from "../Views/Common/Button.svelte";

    function personalDaysReducer(inofficePerDay: InOfficeAvailable) {
        return inofficePerDay.persons.indexOf($userData.user.name) > 0;
    }

    function removeAll() {
        personalDates.forEach((day) => {
            appData.removeAvailability($userData.user, day.date);
        });
    }

    function removeOne(date: Date) {
        appData.removeAvailability($userData.user, date);
    }

    $: personalDates = $appData.officeAvailability.filter(personalDaysReducer);
</script>

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

<section in:fade>
    <Header>Personal overview</Header>
    {#if personalDates.length > 0}
        <p>On these are the days you are in office</p>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>
                        <AppButton on:click={removeAll}>Remove all</AppButton>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each personalDates as date}
                    <tr>
                        <td>
                            {date.date.toDateString()}
                            and
                            {date.persons.length - 1}
                            other persons
                        </td>
                        <td>
                            <AppButton on:click={() => removeOne(date.date)}>
                                Remove
                            </AppButton>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>You don't have any days registered that you come to the office</p>
    {/if}
</section>