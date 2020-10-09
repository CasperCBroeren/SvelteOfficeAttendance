<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { tweened } from "svelte/motion";
    import { backIn } from "svelte/easing";
    import { PanelType } from "../Domain/Enums";
    
    const dispatcher = createEventDispatcher();
    const ribbon = tweened(105, { duration: 600, easing: backIn });

    let menuOpen = false;
    function toggle(): void {
        $ribbon = menuOpen ? 105 : 5;
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
        content: "";
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
    <li on:click={() => navigate(PanelType.Home)}>Home</li>
    <li on:click={() => navigate(PanelType.Personal)}>Personal</li>
    <li on:click={() => navigate(PanelType.Credits)}>Credits</li>
    <li class="ribbonNavigation__toggler" on:click={toggle}>
        {#if menuOpen}▲{:else}▼{/if}
    </li>
</nav>
