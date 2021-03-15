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
};

const getters = {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getAuthStatus: (state) => state.authStatus,
    getLoginProviders: (state) => state.loginProviders,
};

const actions = {
    login({ commit, getters, rootState }, payload) {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            rootState.firebase.auth().useDeviceLanguage();
            let provider;
            let isAnonimous = false;
            switch (payload.loginProvider) {
                case "anonymous":
                    isAnonimous = true;
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
            isAnonimous ? rootState.firebase.auth().signInAnonymously() : rootState.firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result);
                const loggedInFlag = true;
                commit("AUTH_SUCCESS");
                commit("LOGIN", loggedInFlag);
                resolve(result)
            })
            .catch(error => {
                reject(error);
            })
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

    LOGOUT(state) {
        state.isLoggedIn = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};