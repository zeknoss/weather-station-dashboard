<template>
    <div class="col circular">
        <h3>Forecast</h3>
        <h2 @click="toggleMode" class="text-digital">
            {{ mode === 'hPa' ? toHPA(pressure).toFixed(0) : pressure.toFixed(2) }}
            <small>{{ mode }}</small>
        </h2>
        <h4>{{ weather }}</h4>
        <div class="forecast" :class="[slug, isDay ? 'day' : 'night']"></div>
    </div>
</template>

<script setup>
import { toHPA } from '@/composables/helpers';
import StorageRepo from '@/composables/storage';
import { ref } from 'vue';

defineProps({
    pressure: Number,
    weather: String,
    slug: String,
    isDay: Boolean,
});

const mode = ref(StorageRepo.get('pressureUnit', 'hPa'));
const toggleMode = () => {
    mode.value = (mode.value === 'hPa') ? 'bar' : 'hPa';
    StorageRepo.set('pressureUnit', mode.value);
};
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
    font-size: 2em;
    font-weight: normal;
    margin-left: .5em;
    margin-top: 3em;
    margin-bottom: 0;
    small {
        font-size: .4em;
        vertical-align: super;
    }
}
h4 {
    font-weight: normal;
    text-align: center;
    margin: 0;
}
.forecast {
    position: absolute;
    top: 1em;
    left: 1em;
    right: 1em;
    background: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
    height: 5em;

    &.clear {
        background-image: url('/images/forecast/clear.png');

        &.night {
            background-image: url('/images/forecast/clear-night.png');
        }
    }
    &.rainy {
        background-image: url('/images/forecast/rainy.png');
    }
    &.cloudy {
        background-image: url('/images/forecast/cloudy.png');
    }
    &.partially-cloudy {
        background-image: url('/images/forecast/partially-cloudy.png');
    }
    &.thunderstorm {
        background-image: url('/images/forecast/thunderstorm.png');
    }
    &.freezing-rain {
        background-image: url('/images/forecast/freezing-rain.png');
    }
    &.snowfall {
        background-image: url('/images/forecast/snowfall.png');
    }
    &.fog {
        background-image: url('/images/forecast/fog.png');
    }
}
</style>
