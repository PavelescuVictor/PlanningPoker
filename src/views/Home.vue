<template>
    <div id="home">
        <Navbar/>
        <AlertBox alertBoxType="list"/>
        <div class="content"> 
            <p>This is the home page!</p>
        </div>
        <ScrollTop colorScheme="light"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
// import Navbar from "../components/Navbar.vue";
import AlertBox from "@/components/AlertBox.vue";
import ScrollTop from "@/components/ScrollTop.vue";

export default {
    name: "Home",
    components: {
        Navbar,
        AlertBox,
        ScrollTop,
    }
};
</script>
<style lang="scss" scoped>
    #home {
        min-height: 100vh;
        background: $color-purple;
    }

    .content {
        width: $page-content-width;
        margin: auto;
        padding: $navbar-height 0px;
        height: 100vh;
        color: $color-light;
        font-size: 2rem;
        text-align: center;
    }
</style>