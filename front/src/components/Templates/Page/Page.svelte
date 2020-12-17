<script>
  import { getContext } from "svelte";
  import Blocks from "@/components/Blocks/Blocks.svelte";
  const blocks = getContext("blocks");

  export let structure = {};
</script>

{#if structure}
  <h1>{structure.title}</h1>
  {#if structure.content && structure.content.length}
    <Blocks blocks={structure.content} components={$blocks} />
  {/if}
{/if}
