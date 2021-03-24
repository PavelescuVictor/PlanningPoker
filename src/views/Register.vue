<template>
  <div class="register">
    <Navbar :menuType="menuType" :menuStyle="menuStyle" :logoStyle="logoStyle"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    name: "Register",

    components: {
        Navbar
    },

    data() {
      return {
        menuType: "list",
        menuStyle: "dark",
        logoStyle: "dark"
      }
    }
}
</script>

<style>

</style>