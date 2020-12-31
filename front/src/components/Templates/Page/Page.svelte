<script context="module">
  import axios from 'axios'
  export const getServerProps = (req) => {
    return axios
    .get(`http://localhost:1337/pages?fullslug=${req.baseUrl}`)
    .then((res) => res.data)
    .then((data) => data[0])
    .catch(console.error);
  }
</script>

<script>
  import { getContext } from "svelte";
  import Blocks from "@/components/Blocks/Blocks.svelte";
  const blocks = getContext("blocks");

  export let data = {};
</script>

{#if data}
  <div class="container">
    <h1>{data.title}</h1>
    {#if data.content && data.content.length}
      <Blocks blocks={data.content} components={$blocks} />
    {/if}
  </div>
{/if}
