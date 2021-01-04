<script>
  import { setContext } from "svelte";
  import { readable, writable } from "svelte/store";
  import Admin from "@/components/Admin/Admin.svelte";

  export let structure = {};
  export let layout = null;
  export let template = null;
  export let components = {};

  const _data = readable(structure.data || {});
  const _layout = readable(structure.layout || {});

  setContext("stores", {
    components: writable(components || []),
    data: _data,
    layout: _layout,
  });
</script>

<svelte:component this={Admin}>
  {#if layout}
    <svelte:component this={layout} {...$_layout}>
      {#if template}
        <svelte:component this={template} {...$_data} />
      {/if}
    </svelte:component>
  {:else if template}
    <svelte:component this={template} {...$_data} />
  {/if}
</svelte:component>
