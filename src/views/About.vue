<template>
    <div id="about">
        <AlertBox  :alertBoxType="alertBoxType"/>
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
        <div class="content__side">
                <img class="svg-middle-left" src="@/assets/svg-middle-left.svg">
                <img class="svg-top-right-middle" src="@/assets/svg-top-right-middle.svg">
                <img class="svg-bottom-left" src="@/assets/svg-bottom-left.svg">
        </div>
        <div class="about__content"> 
           <div class="content__wrapper">
                <h1 class="content__title">About Page</h1>
                <p class="content__subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam ducimus cumque autem doloribus illo fugiat excepturi, sequi odio nam asperiores, quo omnis suscipit pariatur et? Similique rem consequatur quasi quibusdam sed, tempore praesentium odio.</p>
            </div>
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
    
    .about__content {
        position: relative;
        z-index: 1;
        width: $page-content-width;
        margin: auto;
        padding: $navbar-height 0px;
        height: 100vh;
        color: $color-light;
        font-size: 2rem;
        text-align: center;
    }

     .content__wrapper {
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 5vw;
        padding-top: 5vw;
    }

    .content__title {
        line-height: 4rem;
        font-size: 5rem;
        margin-top: 80px;
    }

    .content__subtitle {
        align-self: center;
        text-align: left;
        font-size: 1.5rem;
        padding: 20px 0px;
    }

    .svg-bottom-left {
        width: 35vw;
        position: absolute;
        left: 0px;
        bottom: 0px;
        z-index: 1;
    }

    .svg-top-right-middle {
        width: 40vw;
        position: absolute;
        right: 0px;
        top: 15%;
        z-index: 1;
    }

    .svg-middle-left {
        height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 0;
    }
</style>
