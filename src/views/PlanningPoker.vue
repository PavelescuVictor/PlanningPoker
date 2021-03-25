<template>
    <div id="planningpoker">
        <AlertBox :alertBoxType="alertBoxType"/>
        <ConfirmationBox />
        <Navbar menuType="list" menuStyle="light" logoStyle="light"/>
        <div class="content__side">
                <img class="svg-middle-left" src="@/assets/svg-middle-left.svg">
        </div>
        <div class="planningpoker__content"> 
            <p>This is the planning poker page!</p>
            <div class="main">
                <div class="main__form">
                    <div class="form__wrapper">
                        <p class="form__title">Create a Session</p>
                        <div class="form" @submit="login">
                            <label for="form__title">Session Title</label>
                            <input id="form__title" v-model="sessionTitle" type="text" placeholder="Session Title">
                            <label for="form__description">Session Description</label>
                            <input id="form__description" v-model="sessionDescription" type="textarea" placeholder="Session Description">
                            <input v-model="userName" type="text" placeholder="User Name">
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
import { mapGetters, mapActions, createLogger } from "vuex"

export default {
    name: "PlanningPoker",

    components: {
        Navbar,
        AlertBox,
        ConfirmationBox,
        ScrollTop,
    },

    data() {
        return {
            valid: true,
            userName: undefined,
            sessionTitle: undefined,
            sessionDescription: undefined,
            createSessionDefault: {
                userName: "Incognito",
                sessionTitle: "Default Session Title",
                sessionDescription: "Default Session Description",
            },
            alertBoxType: "list",
            scrollTopStyle: "light",
            menuType: "list",
            menuStyle: "light",
            logoStyle: "light",
        }
    },

    computed: {
        ...mapGetters(["getAlertTypes", "getAlertDefaultTime", "isLoggedIn", "isAnonymous", "getUserId", "getRoomTypes", "getRoom", "getLoginProviders"]),
    },

    methods: {
        ...mapActions(["addAlert", "addConfirmation", "resetAlertBox", "createRoom", "retrieveRoom", "addUserToRoom", "login"]),

        submitForm: async function(e) {
            e.preventDefault();
            const message = "Are you sure you want to create this session?";
            this.addConfirmation(message);

            const roomType = this.getRoomTypes.PLANNING_POKER;

            if(!this.getUserId) {
                const loginProvider = this.getLoginProviders.ANONYMOUS;
                const user = {}
                 await this.login({ user, loginProvider })
                .then((response) => {
                    let alert = {
                        message: `Logged In With ${loginProvider[0].toUpperCase() + loginProvider.slice(1,loginProvider.length)}`,
                        type: this.getAlertTypes.SUCCESS,
                        time: this.getAlertDefaultTime,
                    }
                    this.resetAlertBox();
                    this.addAlert(alert);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error.message)
                    let alert = {
                        message: error.message,
                        type: this.getAlertTypes.ERROR,
                        time: this.getAlertDefaultTime,
                    }
                    this.addAlert(alert);
                })
            }

            const userId = this.getUserId;
            let roomId = "";
            console.log("User ID", userId);

            await this.createRoom({ userId, roomType })
            .then(response => {
                let alert = {
                    message: `Succesfully created a room`,
                    type: this.getAlertTypes.SUCCESS,
                    time: this.getAlertDefaultTime,
                }
                this.addAlert(alert);
                roomId = response.id;
            })
            .catch(error => {
                let alert = {
                    message: error.message,
                    type: this.getAlertTypes.ERROR,
                    time: this.getAlertDefaultTime,
                }
                this.addAlert(alert);
                console.log(error);
            })

            await this.retrieveRoom({ roomId })
            .then(response => {
                let alert = {
                    message: `Succesfully retrieved the room`,
                    type: this.getAlertTypes.SUCCESS,
                    time: this.getAlertDefaultTime,
                }
                this.addAlert(alert);
                console.log(response);
            })
            .catch(error => {
                let alert = {
                    message: error.message,
                    type: this.getAlertTypes.ERROR,
                    time: this.getAlertDefaultTime,
                }
                this.addAlert(alert);
                console.log(error);
            })
            
            if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
            } else {
                this.$router.push(`/planningpoker/${roomId}`);
            }
        },

        resetForm: function(e) {
            this.userName = null;
            this.sessionTitle = null;
            this.sessionDescription = null;
        },
    }
};
</script>

<style lang="scss" scoped>
    #planningpoker {
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

    .planningpoker__content {
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