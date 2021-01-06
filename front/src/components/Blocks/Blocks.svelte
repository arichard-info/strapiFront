<script>
  import { getContext } from "svelte";
  import RenderBlock from "@/components/Blocks/RenderBlock.svelte";
  export let blocks = [];

  const { components } = getContext("stores");
</script>

{#if !$components || !$components.blocks}
  <p>No component refs :/</p>
{:else if !blocks || !blocks.length}
  <p>No blocks :/</p>
{:else}
  {#each blocks as block}
    {#if $components.blocks[block.__component]}
      <RenderBlock
        component={$components.blocks[block.__component]}
        data={block} />
    {/if}
  {/each}
{/if}
