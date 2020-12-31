<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import Admin from "@/components/Admin/Admin.svelte";

  export let structure = {};
  export let layout = null;
  export let template = null;
  export let blocks = [];

  const _blocks = writable(blocks);
  setContext("blocks", _blocks);
</script>

<svelte:component this={Admin}>
  {#if layout}
    <svelte:component this={layout} data={structure.layout} >
      {#if template}
        <svelte:component this={template} data={structure.data} />
      {/if}
    </svelte:component>
  {:else if template}
    <svelte:component this={template} data={structure.data} />
  {/if}
</svelte:component>
