<script>
  import RenderBlock from "@/components/Blocks/RenderBlock.svelte";
  import registry from "./Blocks.registry";
  export let blocks = [];
</script>

{#if blocks && blocks.length}
  {#each blocks as block}
    <RenderBlock component={registry[block.type]} />
  {/each}
{:else}
  <p>No blocks :/</p>
{/if}
