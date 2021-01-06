<script>
  import { setContext } from "svelte";
  import { generateStores } from "./App.stores";
  import Admin from "@/components/Admin/Admin.svelte";

  export let data = {};
  export let components = { layout: null, template: null, blocks: null };

  const stores = generateStores({ components, data });
  setContext("stores", stores);

  const { components: _components, data: _data } = stores;
</script>

<svelte:component this={Admin}>
  {#if $_components.layout}
    <svelte:component this={$_components.layout} {...$_data.layout}>
      {#if $_components.template}
        <svelte:component this={$_components.template} {...$_data.template} />
      {/if}
    </svelte:component>
  {:else if $_components.template}
    <svelte:component this={$_components.template} {...$_data.template} />
  {/if}
</svelte:component>
