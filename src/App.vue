<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
    name: "App",
    components: {},
    }
</script>
<style lang="scss">
    * {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }

    button {
        border: none;
    }

    button:focus {
        outline: none;
    }

    html, body {
        min-height: $main-height;
        scroll-behavior: smooth;
        font-family: $font-style-1;
    }

    a {
    color: $color-black;
    text-decoration: none;
    }

    #app {
        min-height: 100vh;
    }
</style>
