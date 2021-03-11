<template>
    <div id="navbar">
        <div class="navbar__content">
            <div class="nav__logo" @click="redirectToHome">
                <h4>Placeholder Logo</h4>
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
            showLoggedInButtons: false,
            showLoggedOutButtons: true,
            showProfileButton: false,
        }
    },

    mounted() {
        
    },

    computed: {
        ...mapGetters(["isLoggedIn"])
    },

    methods: {
        ...mapActions(["logout"]),
        redirectToHome: function() {
            if (this.$route.name != "home") {
                this.$router.push({ name: "home" })
            }
        },
    },
}
</script>

<style>

</style>