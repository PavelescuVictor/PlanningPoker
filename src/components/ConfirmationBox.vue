<template>
    <div class="confirmationbox" v-show="getConfirmationVisibleFlag">
        <div class="confirmationbox__underlay"></div>
        <div class="confirmationbox__content">
            <p class="confirmationbox__message">
                {{ getConfirmationMessage }}
            </p>
            <div class="confirmationbox__buttons">
                <div class="buttons__content">
                    <div class="button button--confirm" @click="proceed">
                        <p>Proceed</p>
                    </div>
                    <div class="button button--confirm-reset" @click="cancel">
                        <p>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Confirmation",
    
    data() {
        return {
            elementVisible: false,
        };
    },

    computed: {
        ...mapGetters(["getConfirmationVisibleFlag", "getConfirmationMessage"]),
    },

    methods: {
        ...mapActions(["proceedConfirmation", "cancelConfirmation"]),

        proceed: function() {
            this.proceedConfirmation();
        },

        cancel: function() {
            this.cancelConfirmation();
        },
    },
};
</script>
<style lang="scss" scoped>
.confirmationbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: 1000;
}

.confirmationbox__underlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: .8;
    z-index: 1000;
}

.confirmationbox__content {
    position: relative;
    z-index: 1001;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    top: calc(#{$navbar-height} * 2);
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 20px;
    justify-content: center;
    align-items: center;
    user-select: none;
    font-size: 1.5rem;
    padding: 30px 30px;
    border: 3px solid $color-purple;
    border-radius: 15px;
    background: $color-purple;
}

.confirmationbox__message {
    font-size: 2rem;
    text-align: center;
    color: $color-light;
    line-height: 100%;
    padding: 10px 10px 20px 10px;
}

.confirmationbox__buttons {
    width: 100%;
}

.buttons__content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 0px 20px
}

.button--confirm {
    background: $color-light;
    color: $color-dark;
}

.button--confirm-reset {
    @extend .button--confirm
}
</style>