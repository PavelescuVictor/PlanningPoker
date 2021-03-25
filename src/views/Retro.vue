<template>
    <div id="retro">
        <AlertBox :alertBoxType="alertBoxType"/>
        <ConfirmationBox />
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
        <div class="content__side">
                <img class="svg-middle-left" src="@/assets/svg-middle-left.svg">
        </div>
        <div class="retro__content"> 
            <p>This is the retrospective page!</p>
            <div class="main">
                <div class="main__form">
                    <div class="form__wrapper">
                        <p class="form__title">Create a Session</p>
                        <div class="form" @submit="login">
                            <input v-model="name" type="text" placeholder="Name">
                            <div class="form__buttons">
                                <button class="form__button button button--signin" @click="submitForm" type="submit" :disabled="!valid">
                                    <p>Start Session</p>
                                </button>
                                <button class="form__button button button--reset" @click="resetForm">
                                    <p>Reset</p>
                                </button>
                            </div>
                        </div>
                    </div>
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
import ConfirmationBox from "@/components/ConfirmationBox.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import { mapGetters, mapActions } from "vuex"

export default {
    name: "PlanningPoker",

    components: {
        Navbar,
        AlertBox,
        ConfirmationBox,
        ScrollTop,
    },

    data(){
        return {
            valid: true,
            userName: undefined,
            createSessionDefault: {
                userName: "Incognito",
            },
            alertBoxType: "list",
            scrollTopStyle: "light",
            menuType: "list",
            menuStyle: "light",
            logoStyle: "light",
        }
    },

    computed: {
        ...mapGetters(["getAlertTypes", "getAlertDefaultTime"]),
    },

    methods: {
        ...mapActions(["addAlert", "addConfirmation", "resetAlertBox"]),

        submitForm: function(e) {
            e.preventDefault();
            const message = "Are you sure you want to create this session?";
            this.addConfirmation(message);
        },

        resetForm: function(e) {
            this.name = null;
        },
    }
};
</script>
<style lang="scss" scoped>
    #retro {
        min-height: 100vh;
        background: $color-purple;
    }

    .svg-middle-left {
        height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 0;
    }

    .retro__content {
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

    .main__form {
        width: 40vw;
        margin: auto;
        background: $color-light;
        padding: 20px;
        margin-top: 40px;
        border-radius: 15px;
    }

    .form__wrapper {

    }

    .form__title {
        color: $color-dark;
    }

    .form {
        display: flex;
        flex-direction: column;
        margin: 20px 40px;
    }

    .form input {
        padding: 20px 30px;
        margin: 10px;
        background: $color-grey-1;
        font-weight: 800;
        font-size: 1rem;
        border: none;
        border-radius: 15px;
        transition: border-radius .2s ease-in-out;
        color: $color-dark;
    }

    .form input::placeholder {
        color: $color-grey-2;
        transition: color .2s ease-in-out, padding .2s ease-in-out;
    }

    .form input:hover {
        border-radius: 50px;
    }

    .form input:hover::placeholder {
        padding-left: 5px;
    }

    .form input:focus {
        outline: none;
    }

    .form__buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    .form__button {
        width: 100%;
    }

    .form__buttons button:nth-child(2){
        grid-column: 1/2;
    }

    .form__buttons button:nth-child(2) {
        grid-column: 2/3;
    }
</style>