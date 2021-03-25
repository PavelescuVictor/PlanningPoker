<template>
    <div id="home">
        <AlertBox :alertBoxType="alertBoxType"/>
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
        <div class="content__side">
                <img class="svg-middle-left" src="@/assets/svg-middle-left.svg">
                <img class="svg-top-right-middle" src="@/assets/svg-top-right-middle.svg">
                <img class="svg-bottom-left" src="@/assets/svg-bottom-left.svg">
        </div>
        <div class="home__content"> 
            <div class="content__wrapper">
                <h1 class="content__title">Placeholder Title</h1>
                <p class="content__subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium minima quisquam non quia ea. Dolores quia quasi et. Odit, id.</p>
                <div class="content__buttons">
                    <button class="content__button button button--joinnow" @click="submitForm" type="submit">
                        <p>Join Now</p>
                    </button>
                    <button class="content__button button button--contactus" @click="submitForm" type="submit">
                        <p>Contact Us</p>
                    </button>
                </div>
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

    .home__content {
        position: relative;
        z-index: 1;
        width: $page-content-width;
        height: 100vh;
        margin: auto;
        padding: $navbar-height 0px;
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

    .content__buttons {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        margin: auto;
    }

    .content__button {
        align-self: center;
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