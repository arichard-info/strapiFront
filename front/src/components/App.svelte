<script>
  import { setContext } from "svelte";
  import { readable, writable } from "svelte/store";
  import Admin from "@/components/Admin/Admin.svelte";

  export let structure = {};
  export let layoutComponent = null;
  export let templateComponent = null;
  export let components = {};

  const _components = writable(components || {});
  const _data = readable(structure.data || {});
  const _layout = readable(structure.layout || {});

  setContext("stores", {
    components: _components,
    data: _data,
    layout: _layout,
  });
</script>

<svelte:component this={Admin}>
  {#if layoutComponent}
    <svelte:component this={layoutComponent} {...$_layout}>
      {#if templateComponent}
        <svelte:component this={templateComponent} {...$_data} />
      {/if}
    </svelte:component>
  {:else if templateComponent}
    <svelte:component this={templateComponent} {...$_data} />
  {/if}
</svelte:component>
