<template>
    <div id="navbar">
        <div class="navbar__content">
            <div v-if="logoDisplayed" class="navbar__logo" :class="[logoStyle === 'light' ? 'navbar__logo--light' : 'navbar__logo--dark']" @click="redirectToHome">
                <h4>Placeholder</h4>
            </div>
            <NavbarMenu />
        </div>
    </div>
</template>

<script>
import NavbarMenu from "@/components/NavbarMenu"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "Navbar",
    components: {
        NavbarMenu,
    },
    data() {
        return {
            logoStyle: undefined,
            currentPage: undefined,
            logoDisplayed: true,
        }
    },

    mounted() {
        this.currentPage = this.$route.name;
        this.logoDisplayed = this.navbarColorScheme[this.currentPage].displayed;
        this.logoStyle = this.navbarColorScheme[this.currentPage].logo;
    },

    computed: {
        ...mapGetters(["navbarColorScheme"]),
    },

    methods: {
        redirectToHome: function() {
            if (this.$route.name != "home") {
                this.$router.push({ name: "home" })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
#navbar {
    height: $navbar-height;
    position: fixed;
    width: 100%;
}
.navbar__content {
    height: 100%;
    width: $page-content-width;
    margin: auto;
    display: flex;
    align-items: center;
}

.navbar__logo {
    font-size: 2.5rem;
}

.navbar__logo--light {
    color: $color-light;
}

.navbar__logo--dark {
    color: $color-dark;
}

.navbar__logo h4 {
    cursor: pointer;
}
</style>