<template>
    <div class="overlay" v-if="isLoading">
        <!-- <div class="loading">
            <div class="img">
                <LoadingLogo class="loading-icon" />
            </div>
            <div class="text">Loading</div>
        </div> -->
        <div class="custom-loading"></div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'
// import LoadingLogo from '@/assets/images/LoadingLogo.vue'
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
</script>
<style scoped lang="scss">
@property --deg {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
}

.overlay {
    --bg1: #05283f;
    --bg2: #041e2e;
    --wrm: #d1faff;
    --deg: -12deg;
    --sz: 50px;
    --spd: 2.05s;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    .custom-loading {
        width: var(--sz);
        height: var(--sz);
        background: conic-gradient(from var(--deg) at 50% 50%,
                var(--bg1) 0,
                var(--wrm) 25deg 70deg,
                var(--bg1) 71deg 100%);
        clip-path: polygon(0% 0%,
                40% 0%,
                50% 10%,
                60% 0%,
                100% 0%,
                100% 40%,
                90% 50%,
                100% 60%,
                100% 100%,
                60% 100%,
                50% 90%,
                40% 100%,
                0% 100%,
                0% 60%,
                10% 50%,
                0% 40%);
        animation: fadeIn 0.3s linear 0s forwards, spin var(--spd) linear 0s infinite,
            rotation var(--spd) linear 0s infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: calc(var(--sz) / 10);

        &::before {
            content: "";
            position: absolute;
            width: calc(100% - calc(var(--sz) / 10));
            height: calc(100% - calc(var(--sz) / 10));
            border-radius: calc(var(--sz) / 20);
            background: var(--bg2);
            clip-path: polygon(0% 0%,
                    30% 0%,
                    50% 12%,
                    62% 0%,
                    100% 0%,
                    100% 38%,
                    88% 50%,
                    100% 62%,
                    100% 100%,
                    62% 100%,
                    50% 88%,
                    38% 100%,
                    0% 100%,
                    0% 62%,
                    12% 50%,
                    0% 38%);
        }

        // &:hover {
        //     animation: spin var(--spd) linear 0s infinite,
        //         rotation var(--spd) linear 0s infinite;
        // }

        @keyframes spin {
            0% {
                --deg: 0deg;
            }

            50% {
                --deg: 719deg;
            }

            100% {
                --deg: 1439deg;
            }
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(-360deg);
            }
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;

            }

            100% {
                opacity: 1;
            }
        }
    }



    // .loading {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     gap: 8px;

    //     .img {
    //         width: 40px;
    //         height: 40px;
    //         animation: rotate 2s infinite linear;

    //         .loading-icon {
    //             filter: drop-shadow(0px 0px 2px #5ce1e6) drop-shadow(0px 0px 4px #71e5e9);
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }

    //     .text {
    //         font-size: 0.8rem;
    //         color: #5ce1e6;
    //         filter: drop-shadow(0px 0px 2px #5ce1e6);
    //         letter-spacing: 2px;
    //     }

    //     @keyframes rotate {
    //         to {
    //             transform: rotate(360deg);
    //         }
    //     }
    // }
}
</style>
  