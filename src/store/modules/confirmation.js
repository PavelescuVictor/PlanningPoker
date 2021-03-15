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
        commit("add_confirmation", message);
    },

    cancelConfirmation({ commit }) {
        commit("empty_confirmation");
        commit("cancel_confirmation");
    },

    proceedConfirmation({ commit }) {
        commit("empty_confirmation");
        commit("proceed_confirmation");
    },

    resetConfirmation({ commit }) {
        commit("reset_confirmation");
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