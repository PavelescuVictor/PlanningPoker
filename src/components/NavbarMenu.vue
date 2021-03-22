<template>
    <div id="navbar-menu">
        <div class="navbar-menu__content">
            <div :class="menuType === 'hamburger' ? 'navbar-menu__hamburger' : 'navbar-menu__list'">
                <font-awesome-icon v-if="menuType === 'hamburger'" class="hamburger__icon" :icon="['fas', 'bars']" />
                <ul :class="menuType === 'hamburger' ? 'hamburger__content' : 'list__content'">
                    <router-link to="/home">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Home</a>
                        </li>
                    </router-link>
                    <router-link to="/about">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">About</a>
                        </li>
                    </router-link>
                    <router-link to="/planningpoker">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Planning Poker</a>
                        </li>
                    </router-link>
                    <router-link to="/retrospective">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Retrospective</a>
                        </li>
                    </router-link>
                    <router-link to="/login" v-if="showLoggedOutButtons">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Login</a>
                        </li>
                    </router-link>
                    <router-link to="/register" v-if="showLoggedOutButtons">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Register</a>
                        </li>
                    </router-link>
                    <router-link to="/logout" v-if="showLoggedInButtons">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Logout</a>
                        </li>
                    </router-link>
                    <router-link to="/profile" v-if="showProfileButton">
                        <li>
                            <a class="item__link" :class="menuStyle === 'light' ? 'item__link--light' : 'item__link--dark'">Profile</a>
                        </li>
                    </router-link>
                </ul>
            </div>
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name: "NavbarMenu",

    props: ["menuType"],

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
    height: 100px;
    width: fit-content
}

.navbar-menu__content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.navbar-menu__hamburger {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.hamburger__icon { 
    color: $color-dark;
    font-size: 2rem;
}

.hamburger__content {
    position: absolute;
    right: -2.5vw;
    top: 0px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    background: $color-purple;
    padding: 30px;
    border-bottom-left-radius: 15px;
    list-style-type: none;
    clip-path: circle(0px at 100% 0px);
    transition: clip-path 1s ease-in-out;
}

.navbar-menu__hamburger:hover .hamburger__content {
    clip-path: circle(130% at 90% 12%);
}

.hamburger__content li {
    margin: 5px;
}

.navbar-menu__list {
    width: 100%;
    height: 100%;
}

.list__content {
    height: 100%;
    list-style-type: none;
    display: flex;
    align-items: center;
}

.item__link {
    cursor: pointer;
    padding: 0px 15px;
    font-size: 1.5rem;
    transition: padding .2s ease-in-out;
}

.item__link--light {
    color: $color-light;
}

.item__link--dark {
    color: $color-light;
}
</style>