<template>
    <div id="home">
        <Navbar/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Navbar from "@/components/Navbar.vue";
    // import Navbar from "../components/Navbar.vue";

    export default {
    name: "Home",
    components: {
        Navbar,
    }
    };
</script>
<style lang="scss" scoped>
    #home {
        min-height: 100vh;
        background: $color-purple;
    }
</style>
