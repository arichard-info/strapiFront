<script context="module">
    import axios from "axios";
    export const getServerProps = async () => {
        const menu = await axios
            .get("http://localhost:1337/main-menu")
            .then((res) => res.data)
            .catch(console.error);

        return { menu };
    };
</script>

<script>
    import Header from "./../Header/Header";
    export let menu = "";
</script>

<Header {menu} />
<div class="container">
    <h1>Blog</h1>
    <slot />
</div>
