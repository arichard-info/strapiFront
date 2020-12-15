<script>
  import { onMount } from "svelte";
  let page = null;

  onMount(async () => {
    const allPages = await fetch("http://localhost:1337/pages").then(res =>
      res.json()
    );
    page = allPages[0];
  });

  $: {
    console.log(page);
  }
</script>
