const authStatusChoices = {
    DEFAULT: "",
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error"
};

const state = {
    authStatus: authStatusChoices.DEFAULT,
    loginProviders: {
        ANONYMOUS: "anonymous",
        GOOGLE: "google",
        FACEBOOK: "facebook",
        GITHUB: "github",
    },
    authError: "",
    isLoggedIn: false,
    isAnonymous: false,
};

const getters = {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getAuthStatus: (state) => state.authStatus,
    getLoginProviders: (state) => state.loginProviders,
};

const actions = {
    login({ commit, rootState, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            rootState.firebase.auth().useDeviceLanguage();
            let provider;
            let isAnonymous = false;
            switch (payload.loginProvider) {
                case "anonymous":
                    isAnonymous = true;
                    break;
                case "google":
                    provider = new rootState.firebase.auth.GoogleAuthProvider();
                    break;
                case "facebook":
                    provider = new rootState.firebase.auth.FacebookAuthProvider();
                    break;
                case "github":
                    provider = new rootState.firebase.auth.GithubAuthProvider();
                    break;
                default:
                    reject();
                    break;
            }
            if(isAnonymous) {
                rootState.firebase.auth().signInAnonymously()
                .then(result => {
                    commit("AUTH_SUCCESS");
                    commit("LOGIN_ANONYMOUS");
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
            }
            else {
                rootState.firebase.auth().signInWithPopup(provider)
                .then(result => {
                    commit("AUTH_SUCCESS");
                    commit("LOGIN");
                    resolve(result)
                })
                .catch(error => {
                    reject(error);
                })
            }
        });
    },

    logout({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            rootState.firebase
            .auth()
            .signOut()
            .then(() => {
                commit("LOGOUT");
                resolve()
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
};

const mutations = {
    AUTH_REQUEST(state) {
        state.authStatus = authStatusChoices.PENDING;
    },

    AUTH_SUCCESS(state) {
        state.authStatus = authStatusChoices.SUCCESS;
    },

    AUTH_ERROR(state, error) {
        state.authStatus = authStatusChoices.ERROR;
        state.authError = error;
    },

    AUTH_RESET(state) {
        state.authStatus = authStatusChoices.DEFAULT;
    },

    LOGIN(state) {
        state.isLoggedIn = true;
    },

    LOGIN_ANONYMOUS(state) {
        state.isLoggedIn = true;
        state.isAnonymous = true;
    },

    LOGOUT(state) {
        state.isLoggedIn = false;
        state.isAnonymous = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};