<template>
    <div class="col circular">
        <h3>Wind</h3>
        <div class="cardinal">{{ cardinal }}</div>
        <h2 @click="toggleMode" class="text-digital">{{ value }}<small>{{ windUnit }}</small></h2>

        <div class="direction" :style="{'--angle': angle + 'deg'}"></div>
    </div>
</template>

<script setup>
import { toKM, toKnots } from '@/composables/helpers';
import { computed, inject, ref } from 'vue';

const props = defineProps({
    gust: String,
    angle: Number,
});
const windUnit = inject('windUnit');
const value = computed(() => {
    switch (windUnit.value) {
        case 'km/h':
            return toKM(props.gust ?? 0);
        case 'mph':
            return (parseInt(props.gust) ?? 0).toFixed(2);
        case 'knots':
            return toKnots(props.gust);
    }
});

const cardinal = computed(() => {
    let angle = props.angle ?? 0;
    if ( angle >= 348.75 && angle <= 360 )
        return "N";
    else if ( angle >= 0 && angle <= 11.249 )
        return "N";
    else if ( angle >= 11.25 && angle <= 33.749 )
        return "NNE";
    else if ( angle >= 33.75 && angle <= 56.249 )
        return "NE";
    else if ( angle >= 56.25 && angle <= 78.749 )
        return "ENE";
    else if ( angle >= 78.75 && angle <= 101.249 )
        return "E";
    else if ( angle >= 101.25 && angle <= 123.749 )
        return "ESE";
    else if ( angle >= 123.75 && angle <= 146.249 )
        return "SE";
    else if ( angle >= 146.25 && angle <= 168.749 )
        return "SSE";
    else if ( angle >= 168.75 && angle <= 191.249 )
        return "S";
    else if ( angle >= 191.25 && angle <= 213.749 )
        return "SSW";
    else if ( angle >= 213.75 && angle <= 236.249 )
        return "SW";
    else if ( angle >= 236.25 && angle <= 258.749 )
        return "WSW";
    else if ( angle >= 258.75 && angle <= 281.249 )
        return "W";
    else if ( angle >= 281.25 && angle <= 303.749 )
        return "WNW";
    else if ( angle >= 303.75 && angle <= 326.249 )
        return "NW";
    else if ( angle >= 326.25 && angle <= 348.749 )
        return "NNW";
    else return null;
});
</script>

<style lang="scss" scoped>
.cardinal {
    font-size: 1.2em;
    padding-top: 2.5em;
    margin: 0;
    text-align: center;
}
h2 {
    text-align: center;
    font-size: 3em;
    font-weight: normal;
    margin-left: .5em;
    margin-top: 0;
    small {
        font-size: .2em;
        vertical-align: super;
    }
}
.direction {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    left: 3%;
    top: 0;
    right: 3%;
    aspect-ratio: 1;
    transform: rotate(var(--angle)) scale(0.95);
    border-radius: 100%;
    overflow: hidden;

    &:after {
        content: "";
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid rgb(195, 183, 115);
        width: 0;
        height: 0;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%) translateY(5px);
    }
}
</style>