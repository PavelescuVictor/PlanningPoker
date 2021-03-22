import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const state = {
    alertBoxTypes: {
        LIST: "list",
        OVERRIDE: "override",
    },
    alertDefaultTime: 5000,
    alertTypes: {
        SUCCESS: "success",
        ERROR: "error",
        INFO: "info",
        WARNING: "warning"
    },
    latestAlert: {},
    alertList: [],
};

const getters = {
    getAlertTypes: (state) => state.alertTypes,
    getAlertDefaultTime: (state) => state.alertDefaultTime,
    getLatestAlert: (state) => state.latestAlert,
    getAlertList: (state) => state.alertList,
};

const actions = {
    addAlert({ state, commit, dispatch }, alert) {
        if (alert.time === undefined) alert.time = state.alertDefaultTime;
        alert.id = Math.random().toString(36).substr(2, 9);
        commit("ADD_ALERT", alert);
        setTimeout(() => {
            dispatch("deleteAlert", alert);
        }, alert.time)
    },

    deleteAlert({ commit }, alert) {
        commit("DELETE_ALERT", alert);
    },

    resetAlertBox({ commit }) {
        commit("RESET_ALERTLIST");
        commit("RESET_LATEST_ALERT");
    }
};

const mutations = {
    ADD_ALERT(state, alert) {
        state.alertList.push(alert);
        state.latestAlert = alert;
    },

    DELETE_ALERT(state, alertToDelete) {
        let indexAlertToDelete = null
        state.alertList.forEach((alert) => {
            if(alert.id === alertToDelete.id) indexAlertToDelete = state.alertList.indexOf(alert);
        });
        if(indexAlertToDelete !== null)state.alertList.splice(indexAlertToDelete, 1)
    },

    RESET_ALERTLIST(state) {
        state.alertList = [];
    },

    RESET_LATEST_ALERT(state) {
        state.latestAlert = {};
        console.log(state.alertList);
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};