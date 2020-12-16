<script>
  import { onMount } from "svelte";
  import Admin from "@/components/Admin/Admin.svelte";
  import Blocks from "@/components/Blocks/Blocks.svelte";

  export let structure = {};

  let page = null;

  onMount(async () => {
    const allPages = await fetch("http://localhost:1337/pages")
      .then(res => res.json())
      .catch(console.error);
    page = allPages && allPages[0];
  });
</script>

<svelte:component this={Admin}>
  {#if structure && structure.content}
    <Blocks blocks={structure.content} />
  {/if}
</svelte:component>
