<template>
  <div class="login">
    <AlertBox />
    <ConfirmationBox />
    <Navbar />
    <LoginForm />
    <ScrollTop />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
    name: "Login",
    components: {
        Navbar,
        LoginForm,
    }
}
</script>

<style>

</style>