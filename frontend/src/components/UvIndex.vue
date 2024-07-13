<template>
    <div class="col">
        <h3>Sun</h3>
        <div class="flex">
            <div class="mt-auto">
                <div v-if="mode==='uv'" class="uv-level">
                    <span v-for="level of 7" :class="{active: (uvIndex - (level / 7 * 11)) >= 0}" />
                </div>
                <small>{{ mode == 'uv' ? 'UV Index' : 'Sun Radiation' }}</small>
            </div>
            <h2 @click="mode = (mode === 'uv') ? 'klux' : 'uv'" class="text-digital">
                {{ mode === 'uv' ? uvIndex.toFixed(1) : radiation.toFixed(1) }}
            </h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    uvIndex: Number,
    radiation: Number,
});

const mode = ref('uv');
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    margin-top: 1em;

    small {
        color: rgb(195, 183, 115);
        font-size: .6em;
    }
    .uv-level {
        width: 15px;
        display: flex;
        flex-direction: column-reverse;

        > span {
            display: block;
            margin-top: 2px;
            aspect-ratio: 5/2;
            &.active:nth-child(1) {
                background: rgb(0, 0, 194);
            }
            &.active:nth-child(2) {
                background: rgb(0, 92, 251);
            }
            &.active:nth-child(3) {
                background: rgb(0, 247, 251);
            }
            &.active:nth-child(4) {
                background: rgb(0, 251, 17);
            }
            &.active:nth-child(5) {
                background: rgb(217, 251, 0);
            }
            &.active:nth-child(6) {
                background: rgb(251, 146, 0);
            }
            &.active:nth-child(7) {
                background: rgb(251, 0, 0);
            }
        }
    }
    h2 {
        flex-grow: 1;
        text-align: right;
        margin: 0;
        padding-top: 1em;
        font-size: 3em;
        font-weight: normal;
    }
}
</style>