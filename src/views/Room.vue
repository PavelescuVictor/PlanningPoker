<template>
    <div id="room">
        <AlertBox :alertBoxType="alertBoxType"/>
        <ConfirmationBox />
        <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle" :displayLogo="displayLogo"/>
        <div class="content"> 
            <p>This is the room page!</p>
            <div class="main">
                <p>{{ $route.params.roomId }}</p>
                <ul class="main__connected-users">
                    <li v-for="connectedUser in connectedUsers" :key="connectedUser">{{ connectedUser }}</li>
                </ul>
                <ul class="main__users-submitted-points">
                    <li v-for="userSubmittedPoints in usersSubmittedPoints" :key="userSubmittedPoints">{{ userSubmittedPoints }}</li>
                </ul>
                <div class="main__form">
                    <div class="form__wrapper">
                        <p class="form__title">Points to Submit</p>
                        <div class="form" @submit="login">
                            <input v-model="points" type="number" placeholder="Points" min="0">
                            <div class="form__buttons">
                                <button class="button button--signin" @click="submitForm" type="submit">
                                    <p>Submit</p>
                                </button>
                                <button class="button button--reset" @click="resetForm">
                                    <p>Reset</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main__content">
                    <div class="main__story-icon">
                        <font-awesome-icon class="icon" :icon="['fas', 'comment-alt']" />
                    </div>
                    <div class="main__story">
                        <p class="story__text"></p>
                    </div>
                    <div class="main__cards">
                        <div class="card__item">
                            <button class="button button--point" @click="submitForm" type="submit">
                                <p>Submit</p>
                            </button>
                            <button class="button button--point" @click="submitForm" type="submit">
                                <p>Submit</p>
                            </button>
                            <button class="button button--point" @click="submitForm" type="submit">
                                <p>Submit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ScrollTop scrollTopStyle="light"/>
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
    name: "Room",
    
    components: {
        Navbar,
        AlertBox,
        ConfirmationBox,
        ScrollTop,
    },

    data() {
        return {
            alertBoxType: "list",
            displayLogo: true,
            scrollTopStyle: "light",
            menuType: "list",
            menuStyle: "light",
            logoStyle: "light",
            points: 0,
        }
    },

    async mounted() {
        if(!this.getIsLoggedIn) {
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
        const roomId = this.$route.params.roomId;

        console.log(userId);
        console.log(roomId);

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

        const payload = {
            roomId,
            userId,
            userName: "Default User Name",
        }

        await this.addUserToRoom(payload)
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
    },

    computed: {
        ...mapGetters(["getAlertTypes", "getAlertDefaultTime", "isLoggedIn", "isAnonymous", "getUserId", "getIsLoggedIn", "getRoom", "getLoginProviders"]),
    
        connectedUsers: function() {
            return this.getRoom ? this.getRoom.data().connectedUser : [];
        },

        usersSubmittedPoints: function() {
            return this.getRoom ? this.getRoom.data().usersSubmittedPoints : [];
        }
    },

    methods: {
         ...mapActions(["addAlert", "addConfirmation", "resetAlertBox", "retrieveRoom", "addUserToRoom", "submitPoints","login"]),

        submitForm: async function(e) {
            e.preventDefault();
            const message = "Are you sure you want to submit the points?";
            this.addConfirmation(message);

            const userId = this.getUserId;
            const roomId = this.$route.params.roomId;
            const points = this.points;

            this.submitPoints({ userId, roomId, points})
            .then(response => {
                let alert = {
                    message: `Succesfully submitted points`,
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
        },

        resetForm: function(e) {
            this.points = null;
        },
    }
}
</script>

<style lang="scss" scoped>
    #room {
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

    .main {
        width: 100%;
        min-height: 100%;
    }

    .main__conected-users li{
        list-style-type: none;
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

    .form__buttons button:nth-child(2){
        grid-column: 1/2;
    }

    .form__buttons button:nth-child(2) {
        grid-column: 2/3;
    }

    .main__content {
        width: 100%;
        min-height: 100%;
        background: black;
    }

    .login-alternatives__icon {
        margin: 10px 5px 0px 5px;
        border: 3px solid $color-dark;
        border-radius: 50%;
        cursor: pointer;
        transition: background .2s ease-in-out, margin .2s ease-in-out;
    }

    .login-alternatives__icon:hover {
        background: $color-dark;
        margin: 0px 5px 10px 5px;
    }

    .login-alternatives__icon .icon {
        text-align: center;
        padding: 10px;
        color: $color-dark;
        font-size: 3rem;
        transition: color .2s ease-in-out;
    }

    .icon:hover {
        color: $color-light;
    }

</style>