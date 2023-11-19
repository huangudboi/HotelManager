<script setup>
import { MODAL_TYPE } from '@/constants'
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia';
const modalStore = useModalStore()
const { dataModal } = storeToRefs(modalStore)
const onOk = () => {
    if (
        modalStore?.onOk &&
        typeof modalStore?.onOk === 'function'
    ) {
        modalStore.onOk()
    }
    modalStore.closeModal()
}
const onCancel = () => {
    if (
        modalStore?.onCancel &&
        typeof modalStore?.onCancel === 'function'
    ) {
        modalStore.onCancel()
    }
    modalStore.closeModal()
}
</script>

<template>
    <div class="popup-wrapper" v-if="dataModal.open">
        <div class="popup-overlay" id="popup-overlay" @click="onCancel" />

        <div class="popup">
            <div class="header-popup no-select" :class="{
                error: dataModal.type === MODAL_TYPE.ERROR,
                info: dataModal.type === MODAL_TYPE.INFO,
                warning: dataModal.type === MODAL_TYPE.WARNING,
                success: dataModal.type === MODAL_TYPE.SUCCESS
            }">
                {{ dataModal.title || 'Error' }}
            </div>

            <div class="content-popup custom-scroll-bar">
                {{ dataModal.content || 'No content' }}
            </div>

            <div class="btn-actions">
                <button class="btn btn-ok" :class="{
                    error: dataModal.type === MODAL_TYPE.ERROR,
                    info: dataModal.type === MODAL_TYPE.INFO,
                    warning: dataModal.type === MODAL_TYPE.WARNING,
                    success: dataModal.type === MODAL_TYPE.SUCCESS
                }" type="primary" @click.prevent="onOk">
                    {{ dataModal?.okText || 'OK' }}
                </button>
                <button v-if="dataModal?.cancelText" class="btn btn-cancel" :class="{
                    error: dataModal.type === MODAL_TYPE.ERROR,
                    info: dataModal.type === MODAL_TYPE.INFO,
                    warning: dataModal.type === MODAL_TYPE.WARNING,
                    success: dataModal.type === MODAL_TYPE.SUCCESS
                }" @click.prevent="onCancel">
                    {{ dataModal?.cancelText }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.no-select {
    user-select: none; // prevent highlight text
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: 0.6);
    animation: opacityFadeIn forwards 0.5s ease-in-out;
}

.popup {
    --error-background-color: #9d0208;
    --info-background-color: #00296b;
    --warning-background-color: #f4a261;
    --success-background-color: #588157;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    /* Màu nền của popup */
    z-index: 10000;
    /* Đảm bảo popup hiển thị trên overlay */
    width: 500px;
    min-height: 200px;
    border-radius: 10px;
    animation: fadeIn forwards 0.5s ease-in-out;

    .btn-actions {
        text-align: center;
        padding: 12px;
        display: flex;
        justify-content: center;
        gap: 4px;
    }

    .header-popup {
        min-height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        border-radius: 10px 10px 0px 0px;

        &.error {
            background-color: var(--error-background-color);
        }

        &.info {
            background-color: var(--info-background-color);
        }

        &.warning {
            background-color: var(--warning-background-color);
        }

        &.success {
            background-color: var(--success-background-color);
        }
    }

    .content-popup {
        padding: 10px;
        height: 130px;
        overflow-y: auto;
    }

    .btn {
        padding: 8px 16px;
        min-width: 48px;
        border-radius: 4px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .btn-ok {
        width: fit-content;
        border: none;
        outline: none;
        transition: opacity 0.3s;
        color: #fff;

        &.error {
            background-color: var(--error-background-color);
        }

        &.info {
            background-color: var(--info-background-color);
        }

        &.warning {
            background-color: var(--warning-background-color);
        }

        &.success {
            background-color: var(--success-background-color);
        }

        &:hover {
            opacity: 0.8;
        }
    }

    .btn-cancel {
        background: transparent;

        &.error {
            color: var(--error-background-color);
            border: 1px solid var(--error-background-color);
        }

        &.info {
            color: var(--info-background-color);
            border: 1px solid var(--info-background-color);
        }

        &.warning {
            color: var(--warning-background-color);
            border: 1px solid var(--warning-background-color);
        }

        &.success {
            color: var(--success-background-color);
            border: 1px solid var(--success-background-color);
        }
    }
}

@keyframes fadeIn {
    from {
        transform: translate(-50%, calc(-50% + 50px));
        opacity: 0;
    }

    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}

@keyframes opacityFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
