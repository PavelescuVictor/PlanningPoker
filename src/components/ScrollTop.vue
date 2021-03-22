<template>
    <div id="scrolltop">
        <div class="scrolltop__button" @click="scrollTop" :class="'scrolltop__button--' + colorScheme">
            <font-awesome-icon
                icon="chevron-up"
                class="icon"
            />
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "ScrollTop",
    
    props: ["colorScheme"],

    data() {
        return {};
    },

    methods: {
        scrollTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
    },

    computed: {
        ...mapGetters(["scrollTopColorScheme"]),
    },
};
</script>
<style lang="scss" scoped>

.scrolltop__button {
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0px;
    bottom: 0px;
    margin: 0 1em 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    animation: button-rotate 0.6s ease-in-out both;
    transition: border-radius 0.2s ease-in-out;
    z-index: 100;
    cursor: pointer;
}

.scrolltop__button:hover {
    border-radius: 50px;
}

.scrolltop__button:hover > .icon {
    transform: rotate(360deg);
}

.icon {
    font-size: 2rem;
    transition: transform 0.4s ease-in-out;
}

.scrolltop__button--light {
    background: $color-light;
}

.scrolltop__button--light .icon {
    color: $color-dark;
}

.scrolltop__button--dark {
    background: $color-dark;
}

.scrolltop__button--dark .icon {
    color: $color-light;
}
/************************
        ANIMATIONS
*************************/


@keyframes button-rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>