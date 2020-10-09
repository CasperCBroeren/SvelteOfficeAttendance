<script lang="ts">
    import { fade } from "svelte/transition";
    import { userData } from '../Domain/UserDataStore'

    import Header from "./Common/Header.svelte";
    import AppButton from "./Common/Button.svelte";
    
    function logOut()
    {
        userData.logout();
    }

</script>

<section in:fade>
    <Header>Credits</Header>
    <p>
        Thanks the team of Svelte.dev to make an awsome library. Thanks to Sven
        for clearing some things up while I was learning Svelte
    </p>
    <AppButton on:click={logOut}>Log out</AppButton>
</section>
