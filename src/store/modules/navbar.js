const state = {
    navbarColorScheme: {
        home: {
            logo: "light",
            menu: "light",
            logoDisplayed: true,
            menuDisplayed: true,
        },
        login: {
            logo: "light",
            menu: "dark",
            logoDisplayed: false,
            menuDisplayed: true,
        },
        about: {
            logo: "light",
            menu: "light",
            logoDisplayed: true,
            menuDisplayed: true,
        },
        planningpoker: {
            logo: "light",
            menu: "light",
            logoDisplayed: true,
            menuDisplayed: true,
        },
        retrospective: {
            logo: "light",
            menu: "light",
            logoDisplayed: true,
            menuDisplayed: true,
        }
    },
};

const getters = {
    navbarColorScheme: (state) => state.navbarColorScheme,
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};