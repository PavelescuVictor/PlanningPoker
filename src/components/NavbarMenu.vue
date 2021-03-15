<template>
    <div id="navbar-menu">
        <div class="navbar-menu__content">
            <ul class="navbar-menu__list" :class="[menuStyle === 'light' ? 'navbar-menu__list--light' : 'navbar-menu__list--dark']">
                <router-link to="/home">
                    <li>
                        <a>Home</a>
                    </li>
                </router-link>
                <router-link to="/about">
                    <li>
                        <a>About</a>
                    </li>
                </router-link>
                <router-link to="/login" v-if="showLoggedOutButtons">
                    <li>
                        <a>Login</a>
                    </li>
                </router-link>
                <router-link to="/register" v-if="showLoggedOutButtons">
                    <li>
                        <a>Register</a>
                    </li>
                </router-link>
                <router-link to="/logout" v-if="showLoggedInButtons">
                    <li>
                        <a>Logout</a>
                    </li>
                </router-link>
                <router-link to="/profile" v-if="showProfileButton">
                    <li>
                        <a>Profile</a>
                    </li>
                </router-link>
            </ul>
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name: "NavbarMenu",
    components: {},
    data() {
        return {
            menuStyle: undefined,
            currentPage: undefined,
            showLoggedInButtons: false,
            showLoggedOutButtons: true,
            showProfileButton: false,
        }
    },

    mounted() {
        if (this.getIsLoggedIn) {
            this.showLoggedInButtons = true;
            this.showLoggedOutButtons = false;
        }

        this.currentPage = this.$route.name;
        this.menuStyle = this.navbarColorScheme[this.currentPage].menu;
    },

    computed: {
        ...mapGetters(["getIsLoggedIn", "navbarColorScheme"])
    },

    methods: {
        ...mapActions(["logout"]),
    },
}
</script>

<style lang="scss" scoped>
#navbar-menu {
    margin-left: auto;
}

.navbar-menu__content {

}

.navbar-menu__list {
    list-style-type: none;
    display: flex;
}

.navbar-menu__list li a{
    cursor: pointer;
    padding: 0px 15px;
    font-size: 1.5rem;
}

.navbar-menu__list--light li a {
    color: $color-light;
}

.navbar-menu__list--dark li a {
    color: $color-dark;
}
</style>