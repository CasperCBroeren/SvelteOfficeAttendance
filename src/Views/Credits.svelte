<script lang="ts">
    import { fade } from 'svelte/transition';

    import Header from './Common/Header.svelte';
</script>
<section in:fade>
    <Header>Credits</Header>
    <p>Thanks the team of Svelte.dev to make an awsome library. Thanks to Sven for clearing some things up while I was learning Svelte</p>
</section>