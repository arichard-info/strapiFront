<script>
  export let component = null;
  export let type = "";
  export let props = {};

  let renderComponent = component;
  let adminComponent = null;
  let editable = true;
  let adminUI = false;

  const toggleAdmin = async e => {
    e.stopPropagation();
    if (!adminComponent && editable) {
      adminComponent = await import(
        `@/components/Blocks/${type}/${type}.admin.svelte`
      );
      if (adminComponent) editable = true;
    }
    if (editable) adminUI = true;
  };
</script>

<div on:click={toggleAdmin}>
  {#if component}
    <svelte:component this={renderComponent} {...props} />
  {/if}
</div>
