<template>
    <div class="scroll-top">
        <div class="scroll-top__button" @click="scrollTop" :style="scrollTopStyle">
            <font-awesome-icon
                icon="chevron-up"
                class="icon"
                :style="scrollTopStyle"
            />
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "ScrollTop",
    data() {
        return {
            scrollTopStyle: {
                color: "",
                backgroundColor: "",
            },
        };
    },
    methods: {
        scrollTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
    },
    mounted: function() {
        let currentPage = this.$route.name;
        this.scrollTopStyle.backgroundColor = this.scrollTopColorScheme[
            currentPage
        ][0];
        this.scrollTopStyle.color = this.scrollTopColorScheme[currentPage][1];
    },
    computed: {
        ...mapGetters(["scrollTopColorScheme"]),
    },
};
</script>
<style scoped>
.scroll-top__button {
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    background: var(--color-white);
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
.scroll-top__button:hover {
    border-radius: var(--border-radius-circle);
}
.scroll-top__button:hover > .icon {
    transform: rotate(360deg);
}
.icon {
    font-size: 2.3rem;
    color: var(--color-blue);
    transition: transform 0.4s ease-in-out;
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