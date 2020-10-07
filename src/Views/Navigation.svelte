<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatcher = createEventDispatcher();

    let menuOpen = false;
    function toggle() : void
    {
        menuOpen = !menuOpen;
    }

    function navigate(panel:string)
    {
        dispatcher('navigate', panel);

        if (history.pushState) { 
				history.pushState(null, null, "#" + panel);
			}
			else {
				location.hash = "#" + panel;
			}
        toggle();
    }
</script>
<nav class="ribbonNavigation" 
    class:ribbonNavigation--expand={menuOpen}>
    <li on:click={() => navigate('home')}>Home</li>
    <li on:click={() => navigate('personal')}>Personal</li>
    <li on:click={() => navigate('credits')}>Credits</li>
    <li class="ribbonNavigation__toggler" on:click={toggle}> 	
        {#if menuOpen}
        ▲
        {:else}
        ▼ 
    {/if}</li>
</nav>

<style>
    .ribbonNavigation { 
        background-color: #892200;
        width: 150px;
        list-style-type: none;
        position: absolute;        
        margin: 0px auto;
        padding: 5px 0px 0px;
        top: -110px;    
        border-radius: 4px;
    }

    .ribbonNavigation--expand { 
        top: -5px;
    }
    .ribbonNavigation::after {
        content: '';
       
    }
    .ribbonNavigation li{
        color: #fff;
        padding: 6px 0px;
        cursor: pointer; 
        width: 100%;
    }

    .ribbonNavigation__toggler {
        height: 20px;
        display: inline-block;

    }
</style>