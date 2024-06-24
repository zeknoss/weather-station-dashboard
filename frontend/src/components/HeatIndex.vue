<template>
    <div class="col">
        <h3>Index</h3>
        <div class="flex">
            <div class="mt-auto">
                <small class="subtitle">Feels Like</small>
            </div>
            <h2 @click="$emit('toggleTemp')" class="text-digital">
                {{ tempMode === 'celsius' ? index.toFixed(2) : toFahrenheit(index) }} <small>{{ tempMode === 'celsius' ? '℃' : '℉' }}</small>
            </h2>
        </div>
    </div>
</template>

<script setup>
import HI from '@/composables/heatIndex';
import { toCelsius, toFahrenheit } from '@/composables/helpers';
import { computed, inject } from 'vue';

const props = defineProps({
    temp: Number,
    humidity: Number,
});
defineEmits(['toggleTemp']);

const tempMode = inject('tempMode');

const hi = new HI();
const index = computed(() => {
    return hi.calculate({
        temperature: parseFloat(toCelsius(props.temp ?? 0), 2),
        humidity   : props.humidity ?? 0,
        fahrenheit : false,
    });
})
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    margin-top: 1em;

    .subtitle {
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
        font-size: 3.5em;
        font-weight: normal;

        small {
            font-size: .3em;
        }
    }
}
</style>