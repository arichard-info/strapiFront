<script>
  import blockRegistry from "./Blocks.registry";
  export let component = null;
  export let data = {};

  const blockConfig = blockRegistry[data.__component];

  let adminComponent = null;
  let editable = true;
  let adminUI = false;

  const loadAdmin = async () => {
    adminComponent = await blockConfig
      .admin()
      .then(ref => ref.default)
      .catch(() => null);
    editable = !!adminComponent;
    if (!editable) adminUI = false;
  };

  $: adminUI && !adminComponent && loadAdmin();
</script>

<div>
  <input type="checkbox" bind:checked={adminUI} />
  {#if editable && adminUI && adminComponent}
    <svelte:component this={adminComponent} {...data} />
  {:else if component}
    <svelte:component this={component} {...data} />
  {/if}
</div>
