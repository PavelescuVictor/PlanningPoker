<template>
    <div class="logout"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Logout",

    created() {
        this.logout()
            .then(() => {
                let alert = {
                    message: `Logged Out`,
                    type: this.getAlertTypes.SUCCESS,
                    time: this.getAlertDefaultTime,
                }
                this.resetAlertBox();
                this.addAlert(alert);
                console.log(this.getIsLoggedIn);
                if (!this.getIsLoggedIn) {
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl);
                    } else {
                        this.$router.push("home");
                    }
                }
            })
            .catch((error) => {
                let alert = {
                    message: error.message,
                    type: this.getAlertTypes.ERROR,
                    time: this.getAlertDefaultTime,
                }
                this.addAlert(alert);
            });
    },

    computed: {
        ...mapGetters(["getIsLoggedIn", "getAlertTypes", "getAlertDefaultTime"]),
    },

    methods: {
        ...mapActions(["logout", "addAlert", "resetAlertBox"]),
    },
};
</script>
<style scoped></style>