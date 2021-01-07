<script>
    import Link from "@/components/Global/Link/Link";
    export let menu = {};
</script>

<style type="text/scss">
    @import "./Header";
</style>

<header>
    <nav class="container">
        <span><Link href="/">Camon</Link></span>
        <ul>
            {#if menu && menu.items && menu.items.length}
                {#each menu.items as item}
                    <li>
                        <Link href={item.url}>{item.label}</Link>
                    </li>
                {/each}
            {/if}
        </ul>
    </nav>
</header>
