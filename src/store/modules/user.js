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
    authError: undefined,
    isLoggedIn: false,
    isAnonymous: false,
    userId: undefined,
};

const getters = {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getAuthStatus: (state) => state.authStatus,
    getLoginProviders: (state) => state.loginProviders,
    getUserId: (state) => state.userId,
    getIsAnonymouse: (state) => state.isAnonymous,
};

const actions = {
    login({ commit, rootState, getters }, payload) {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            rootState.auth.useDeviceLanguage();
            let provider;
            let isAnonymous = false;
            switch (payload.loginProvider) {
                case "anonymous":
                    isAnonymous = true;
                    break;
                case "google":
                    provider = new rootState.auth.GoogleAuthProvider();
                    break;
                case "facebook":
                    provider = new rootState.auth.FacebookAuthProvider();
                    break;
                case "github":
                    provider = new rootState.auth.GithubAuthProvider();
                    break;
                default:
                    reject();
                    break;
            }
            if(isAnonymous) {
                rootState.auth.signInAnonymously()
                .then(result => {
                    commit("AUTH_SUCCESS");
                    commit("LOGIN_ANONYMOUS", rootState.auth.currentUser.uid);
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
            }
            else {
                rootState.auth.signInWithPopup(provider)
                .then(result => {
                    commit("AUTH_SUCCESS");
                    commit("LOGIN", rootState.auth.currentUser.uid);
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

    LOGIN(state, userId) {
        state.isLoggedIn = true;
        state.userId = userId;
    },

    LOGIN_ANONYMOUS(state, userId) {
        state.isLoggedIn = true;
        state.isAnonymous = true;
        state.userId = userId;
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