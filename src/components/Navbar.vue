<template>
    <div id="navbar">
        <div class="navbar__content">
            <div v-if="displayLogo" class="navbar__logo" :class="[logoStyle === 'light' ? 'navbar__logo--light' : 'navbar__logo--dark']" @click="redirectToHome">
                <h4>Placeholder</h4>
            </div>
            <NavbarMenu :menuType="menuType" :menuStyle="menuStyle"/>
        </div>
    </div>
</template>

<script>
import NavbarMenu from "@/components/NavbarMenu"

export default {
    name: "Navbar",

    props: ["menuType", "menuStyle", "logoStyle", "displayLogo"],

    components: {
        NavbarMenu,
    },

    data() {
        return {
            currentPage: undefined,
        }
    },

    mounted() {
        this.currentPage = this.$route.name;
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
    position: absolute;
    width: 100%;
    z-index: 1000;
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