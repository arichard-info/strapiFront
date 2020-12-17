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
  <svelte:component this={layout}>
    <svelte:component this={template} {structure} />
  </svelte:component>
</svelte:component>
