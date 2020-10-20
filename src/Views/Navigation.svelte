<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { tweened } from "svelte/motion";
    import { backIn } from "svelte/easing";
    import { PanelType } from "../Domain/Enums";
    
    const menuHeight = 15 + (30 * Object.keys(PanelType).length);
    const dispatcher = createEventDispatcher();
    const ribbon = tweened(menuHeight, { duration: 600, easing: backIn });
    
    let menuOpen = false;
    function toggle(): void {
        $ribbon = menuOpen ? menuHeight : 5;
        menuOpen = !menuOpen;
    }

    function navigate(panel: PanelType) {
        dispatcher("navigate", panel);

        if (history.pushState) {
            history.pushState(
                null,
                document.title + " - " + panel,
                "#" + panel
            );
        } else {
            location.hash = "#" + panel;
        }
        toggle();
    }
 
</script>

<!-- svelte-ignore empty-block -->
<style>
    .ribbonNavigation {
        background-color: #892200;
        width: 150px;
        list-style-type: none;
        position: absolute;
        margin: 0px auto;
        padding: 5px 0px 0px;
        border-radius: 4px;
        border: 1px solid #c54d25;
    }

    .ribbonNavigation--expand {
        top: -5px;
    } 
    
    .ribbonNavigation li {
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

<nav
    class="ribbonNavigation"
    class:ribbonNavigation--expand={menuOpen}
    style="top: -{$ribbon}px">
    {#each Object.keys(PanelType) as panel}
        <li on:click={() => navigate(PanelType[panel])}>{panel}</li>
    {/each} 
    <li class="ribbonNavigation__toggler" on:click={toggle}>
        {#if menuOpen}▲{:else}▼{/if}
    </li>
</nav>
