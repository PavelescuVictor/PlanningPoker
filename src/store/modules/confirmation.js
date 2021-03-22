const state = {
    confirmationMessage: "",
    confirmationVisibleFlag: false,
    proceedFlag: false,
};

const getters = {
    getConfirmationMessage: (state) => state.confirmationMessage,
    getConfirmationVisibleFlag: (state) => state.confirmationVisibleFlag,
    getConfirmationProceedFlag: (state) => state.proceedFlag,
};

const actions = {
    addConfirmation({ commit }, message) {
        commit("ADD_CONFIRMATION", message);
    },

    cancelConfirmation({ commit }) {
        commit("EMPTY_CONFIRMATION");
        commit("CANCEL_CONFIRMATION");
    },

    proceedConfirmation({ commit }) {
        commit("EMPTY_CONFIRMATION");
        commit("PROCEED_CONFIRMATION");
    },

    resetConfirmation({ commit }) {
        commit("RESET_CONFIRMATION");
    },
};

const mutations = {
    ADD_CONFIRMATION(state, message) {
        state.confirmationMessage = message;
        state.confirmationVisibleFlag = true;
        state.proceedFlag = false;
    },

    EMPTY_CONFIRMATION(state) {
        state.confirmationMessage = "";
        state.confirmationVisibleFlag = false;
    },

    CANCEL_CONFIRMATION(state) {
        state.proceedFlag = false;
    },

    PROCEED_CONFIRMATION(state) {
        state.proceedFlag = true;
    },

    RESET_CONFIRMATION(state) {
        state.proceedFlag = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};