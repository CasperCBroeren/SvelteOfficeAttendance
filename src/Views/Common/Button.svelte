<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function click()
    {
        dispatch('click', null);
    }
</script>
<button on:click={click}>
    <slot></slot>
</button>

<style>
    button {
        padding: 10px 15px;
        cursor: pointer;
    }
</style>