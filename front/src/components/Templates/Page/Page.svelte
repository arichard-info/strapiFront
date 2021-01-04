<script context="module">
  import axios from "axios";
  export const getServerProps = async (req) => {
    const data = await axios
      .get(`http://localhost:1337/pages?fullslug=${req.baseUrl}`)
      .then((res) => res.data)
      .then((data) => data[0])
      .catch(console.error);
    if (data && data.content && data.content.length)
      data.components = data.content.map((c) => c.__component);
    return data;
  };
</script>

<script>
  import Blocks from "@/components/Blocks/Blocks.svelte";
  export let title = "";
  export let content = "";
</script>

<div class="container">
  <h1>{title}</h1>
  {#if content && content.length}
    <Blocks blocks={content} />
  {/if}
</div>
