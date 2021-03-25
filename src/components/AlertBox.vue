<template>
    <div id="alertbox">
        <div class="alertbox__list" v-if="alertBoxType === 'list'">
            <transition-group name="alert">
                <div v-for="alert in getAlertList" :key="alert.id" :class="['alertbox__item','alertbox__item--' + alert.type]" @click="removeAlert(alert)">
                        <p>{{ alert.message }}</p>
                        <font-awesome-icon class="item__icon" :icon="['fas', 'trash-alt']" />
                </div>
            </transition-group>
        </div>
        <div class="alertbox__list" v-else>
                <div class="alertbox__item" :class="['alertbox__item--' + getLatestAlert.type]" @click="removeAlert(getLatestAlert)">
                    <p>{{ getLatestAlert.message }}</p>
                </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Alerts",
    props: ['alertBoxType'],
    data() {
        return {
        };
    },

    methods: {
        ...mapActions(["deleteAlert", "resetAlertBox"]),

        removeAlert: function(alert) {
            this.deleteAlert(alert)
        },

    },

    computed: {
        ...mapGetters(["getLatestAlert", "getAlertList"]),
    },
};
</script>
<style lang="scss" scooped>

#alertbox {
    position: fixed;
    top: $navbar-height;
    left: 5px;
    width: fit-content;
    height: fit-content;
    z-index: 1000;
}

.alertbox__list {
    height: calc(#{$content-height} - #{$navbar-height});
    width: max-content;
    display: flex;
    flex-direction: column;
    overflow: scroll;
}

.alertbox__list::-webkit-scrollbar {
    display: none;
}

.alertbox__item {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: var(--font-size-alertbox);
    margin: .2em 0px;
    margin-right: auto;
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        var(--color-blue) 50%
    );
    background-size: 6.5em 6.5em;
    border: 3px solid var(--color-light);
    border-radius: 10px;
    animation: alertbox__slide-down 0.6s ease-in forwards, alertbox__fill 1s ease-out forwards;
    user-select: none;
    cursor: pointer;
    transition: margin-left .2s ease-in-out;
}

.alertbox__item p {
    padding: 0px 20px;
    text-align: center;
    color: var(--color-light);
    font-size: var(--font-size-alertbox);
    opacity: 0;
    letter-spacing: -10px;
    animation: alertbox__text-fade-in 0.4s ease-out forwards;
    animation-delay: 0.4s;
    transition: padding .2s ease-in-out;
}

.alertbox__item:hover p {
    padding: 0px 25px;
}

.item__icon {
    opacity: 0;
    margin-right: -10px;
    color: $color-dark;
    transition: opacity .2s ease-in-out, margin-left .2s ease-in-out, margin-right .2s ease-in-out;
}

.alertbox__item:hover .item__icon {
    margin-right: 25px;
    margin-left: -5px;
    opacity: 1;
}

.alertbox__item:hover {
    margin-left: 10px;
}

.alertbox__item--success {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        $color-green 50%
    );
    background-size: 7em 7.5em;
    border-color: $color-green;
}

.alertbox__item--success p {
    color: $color-dark;
}

.alertbox__item--info {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        $color-light 50%
    );
    background-size: 7em 7.5em;
    border-color: $color-light;
}
.alertbox__item--info p {
    color: $color-dark;
}

.alertbox__item--warning {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        $color-yellow 50%
    );
    background-size: 7em 7.5em;
    border-color: $color-yellow;
}

.alertbox__item--warning p {
    color: $color-dark;
}

.alertbox__item--error {
    background: -webkit-linear-gradient(
        -90deg,
        transparent 50%,
        $color-red 50%
    );
    background-size: 7em 7.5em;
    border-color: $color-red;
}

.alertbox__item--error p {
    color: $color-dark;
}

@keyframes alertbox__fill {
    from {
        background-position: 0px 0px;
        border-radius: 10px;
    }
    to {
        background-position: 0px -60px;
        border-radius: 50px;
    }
}

@keyframes alertbox__slide-down {
    0% {
        top: 0px;
        padding: 0.8em 0.5em;
    }
    50% {
        top: 30px;
    }
    75% {
        padding: 0.1em 0.5em;
    }
    100% {
        top: 25px;
        padding: 0.8em 0.5em;
    }
}

@keyframes alertbox__text-fade-in {
    from {
        opacity: 0;
        letter-spacing: -10px;
    }
    to {
        opacity: 1;
        letter-spacing: 0em;
    }
}

/****************************************
             Transitions Vue
*****************************************/

.alert-enter {
    opacity: 0;
}

.alert-enter-active { 
    transition: opacity .5s;
}

.alert-leave {
    opacity: 1;
}

.alert-leave-active {
    transition: opacity .5s;
    opacity: 0;
}

</style>