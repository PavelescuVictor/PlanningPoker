<template>
    <div id="about">
        <AlertBox  :alertBoxType="alertBoxType"/>
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
        <div class="content"> 
            <p>This is the about page!</p>
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
    name: "About",

    components: {
        Navbar,
        AlertBox,
        ScrollTop,
    },

    data() {
        return {
            menuType: "list",
            menuStyle: "light",
            logoStyle: "light",
            scrollTopStyle: "light",
            alertBoxType: "list",
        }
    }
};
</script>
<style lang="scss" scoped>
    #about {
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
