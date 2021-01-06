<script>
    import { getContext } from "svelte";
    const { router } = getContext("stores");

    export let href = "";
    export let target = "";

    const handleClick = (e) => {
        if (target === "_blank") return;
        e.preventDefault();
        router.navigate(href);
    };
</script>

<a {href} {target} on:click={handleClick}><slot /></a>
