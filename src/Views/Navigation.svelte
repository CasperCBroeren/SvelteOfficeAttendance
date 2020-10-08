<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { backIn } from 'svelte/easing';

    const dispatcher = createEventDispatcher();
    const ribbon = tweened(105, {duration: 600, easing: backIn});

    let menuOpen = false;
    function toggle() : void {
        $ribbon = (menuOpen) ? 105 : 5;
        menuOpen = !menuOpen;
    }

    function navigate(panel:string)
    {
        dispatcher('navigate', panel);

        if (history.pushState) { 
				history.pushState(null, document.title + " - " + panel, "#" + panel);
			}
			else {
				location.hash = "#" + panel;
			}
        toggle();
    }
</script>
<nav class="ribbonNavigation" 
    class:ribbonNavigation--expand={menuOpen}
    style="top: -{$ribbon}px">
    <li on:click={() => navigate('home')}>Home</li>
    <li on:click={() => navigate('personal')}>Personal</li>
    <li on:click={() => navigate('credits')}>Credits</li>
    <li class="ribbonNavigation__toggler" on:click={toggle}> 	
        {#if menuOpen}
        ▲
        {:else}
        ▼ 
        {/if}
    </li>
</nav>

<style>
    .ribbonNavigation { 
        background-color: #892200;
        width: 150px;
        list-style-type: none;
        position: absolute;        
        margin: 0px auto;
        padding: 5px 0px 0px;      
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