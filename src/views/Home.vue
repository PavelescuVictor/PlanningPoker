<template>
    <div id="home">
        <AlertBox :alertBoxType="alertBoxType"/>
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
        <div class="content"> 
            <p>This is the home page!</p>
        </div>
        <ScrollTop :scrollTopStyle="scrollTopStyle"/>
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
    },

    data() {
        return {
            alertBoxType: "list",
            menuType: "list",
            menuStyle: "light",
            logoStyle: "light",
            scrollTopStyle: "light",
        }
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