<template>
    <div id="login">
        <AlertBox alertBoxType="list"/>
        <ConfirmationBox />
        <Navbar />
        <div class="login__content">
            <div class="content__side">

            </div>
            <div class="content__main">
                <div class="main__language-selector">
                    <p></p>
                </div>
                <div class="main__title">
                    <p>Login into <br> your account</p>
                </div>
                <div class="main__login-alternatives">
                    <div class="login-alternatives__icons">
                        <div class="login-alternatives__icon">
                            <font-awesome-icon class="icon" :icon="['fab', 'google']" />
                        </div>
                        <div class="login-alternatives__icon">
                            <font-awesome-icon class="icon" :icon="['fab', 'facebook']" />
                        </div>
                        <div class="login-alternatives__icon">
                            <font-awesome-icon class="icon" :icon="['fab', 'github']" />
                        </div>
                    </div>
                    <p>or login with your account</p>
                </div>
                <div class="main__form">
                    <div class="form__wrapper">
                        <div class="form" @submit="login">
                            <input v-model="userEmail" type="email" placeholder="Email">
                            <input v-model="userPassword" type="password" placeholder="Password">
                            <div class="form__terms">
                                    <input id="terms__checkbox" class="checkbox__input" v-model="termsAgreed" type="checkbox" name="checkbox"> 
                                    <label for="terms__checkbox" class="checkbox__label">
                                        <span class="label__icon">
                                            <font-awesome-icon class="icon" :icon="['fas', 'check']" />
                                        </span>
                                        I agree <a>Terms</a> and <a>Privacy Policy</a>
                                    </label>
                            </div>
                            <div class="form__buttons">
                                <button class="button button--signin" @click="submitForm" type="submit" :disabled="!valid">
                                    <p>Sign In</p>
                                </button>
                                <button class="button button--reset" @click="resetForm">
                                    <p>Reset</p>
                                </button>
                                <button class="button button--signin " @click="loginAnonimously">
                                    <p>Sign In Withouth Account</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ScrollTop />
        <Footer />
    </div>
</template>

<script>
import AlertBox from "@/components/AlertBox.vue";
import Navbar from "@/components/Navbar.vue";
import LoginForm from "@/components/LoginForm.vue";
import { mapGetters, mapActions } from "vuex"

export default {
    name: "Login",

    components: {
        AlertBox,
        Navbar,
        LoginForm,
    },

    data() {
        return {
            valid: true,
            userEmail: null,
            userPassword: null,
            termsAgreed: false,
        }
    },

    mounted() {
        let alert = {
            message: "Alert Exemple SUCCESS",
            type: this.getAlertTypes.SUCCESS,
            time: this.getAlertDefaultTime,
        }
        this.addAlert(alert);

        setTimeout(()=> {
            alert = {
                message: "Alert Exemple INFO",
                type: this.getAlertTypes.INFO,
                time: 2000,
            }
            this.addAlert(alert);
        }, 2000);

        setTimeout(()=> {
            alert = {
                message: "Alert Exemple Error",
                type: this.getAlertTypes.ERROR,
                time: 6000,
            }
            this.addAlert(alert);
        }, 3000);

        setTimeout(()=> {
            alert = {
                message: "Alert Exemple Warning",
                type: this.getAlertTypes.WARNING,
                time: 8000,
            }
            this.addAlert(alert);
        }, 4000);
    },

    computed: {
        ...mapGetters(["getAlertTypes", "getAlertDefaultTime", "getLoginProviders"]),
    },
  
    methods: {
        ...mapActions(["addAlert", "login"]),

        submitForm: function(e) {
            e.preventDefault();
        },

        resetForm: function(e) {
            this.userEmail = null
            this.userPassword = null;
        },

        loginAnonimously: function(e) {
            let alert = {
                message: Math.random().toString(36).substr(2, 5),
                type: this.getAlertTypes.SUCCESS,
                time: Math.round(Math.random() * (10000 - 2000)) + 2000,
            }
            this.addAlert(alert);
            // const loginProvider = this.getLoginProviders.ANONYMOUS;

            // const user = {
            // }

            // this.login({ user, loginProvider })
            // .then(() => {
            //     let alert = {
            //         message: `Logged In ${this.getLoginProviders[loginProvider]}`,
            //         type: this.getAlertTypes.SUCCESS,
            //         time: this.getAlertDefaultTime,
            //     }
            //     this.addAlert(alert);
            // })
            // .catch((error) => {
            //     let alert = {
            //         message: error.message,
            //         type: this.getAlertTypes.ERROR,
            //         time: this.getAlertDefaultTime,
            //     }
            //     this.addAlert(alert);
            // })
        }
    }
}
</script>
<style lang="scss" scoped>
#login {
    height: $main-height;
}

.login__content {
    height: 100%;
    margin: auto;
    display: flex;
}

.content__side {
    width: $login-side-width;
    height: 100%;
    background: $color-purple;
    padding: 5vw;
}

.content__main {
    width: $login-main-width;
    height: fit-content;
    margin: auto;
    padding: 0 5vw;
    background: $color-light;
    display: flex;
    flex-direction: column;
}

.main__language-selector {
}

.main__title {
}

.main__title p {
    font-size: 3rem;
    text-align: center;
    color: $color-dark;
    margin: 10px;
}

.main__login-alternatives {
    margin: 0px auto;
}

.main__login-alternatives p {
    text-align: center;
    font-size: 1.2rem;
}

.login-alternatives__icons {
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
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

.main__login-alternatives .icon:nth-child(2) {
    margin: 0px 15px;
} 

.main__login-alternatives p {
    color: $color-dark;
}

.main__form {
}

.form__wrapper {

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

.form__terms {
    margin: 10px;
    font-size: 1rem;
    color: $color-dark;
}

.checkbox__input {
    opacity: 0;
    position: absolute;
}

.checkbox__input, .checkbox__label {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
}

.checkbox__lable {
    position: relative;
}

.form__terms a {
    color: $color-red;
}

.form__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.form__buttons button:nth-child(2){
    grid-rows: 1/2;
    grid-columns: 1/2;
}

.form__buttons button:nth-child(2) {
    grid-rows: 1/2;
    grid-columns: 2/3;
}

.form__buttons button:last-child {
    grid-row: 2/3;
    grid-column: 1/3;
}
</style>