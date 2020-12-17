<script>
  import RenderBlock from "@/components/Blocks/RenderBlock.svelte";
  export let blocks = [];
  export let components = {};
</script>

{#if blocks && blocks.length}
  {#each blocks as block}
    <RenderBlock component={components[block.__component]} data={block} />
  {/each}
{:else}
  <p>No blocks :/</p>
{/if}
