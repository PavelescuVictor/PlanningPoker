import { createStore } from "vuex";
import user from "./modules/user.js";
import navbar from "./modules/navbar.js";
import alert from "./modules/alert.js";
import confirmation from "./modules/confirmation.js";

import firebase from "firebase";

export default createStore({
    state: {
        firebase: firebase,
    },
    mutations: {},
    actions: {},
    modules: {
    user,
    navbar,
    alert,
    confirmation,
    }
});