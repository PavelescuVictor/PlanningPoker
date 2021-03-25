<template>
	<div class="profile">
		<Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"  :displayLogo="displayLogo"/>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    name: "Profile",

    components: {
        Navbar,
    },

    data() {
		return {
			menuType: "list",
			menuStyle: "light",
			logoStyle: "light",
            displayLogo: true,
		}
    }
}
</script>

<style>

</style>