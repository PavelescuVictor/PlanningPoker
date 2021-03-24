import { createStore } from "vuex";
import user from "./modules/user.js";
import room from "./modules/room.js";
import navbar from "./modules/navbar.js";
import alert from "./modules/alert.js";
import confirmation from "./modules/confirmation.js";

import {firebase, db, auth, firebaseApp } from "../scripts/firebase";

export default createStore({
    state: {
        firebase: firebase,
        firebaseApp: firebaseApp,
        db: db,
        auth: auth,
    },
    mutations: {},
    actions: {},
    modules: {
    user,
    room,
    navbar,
    alert,
    confirmation,
    }
});