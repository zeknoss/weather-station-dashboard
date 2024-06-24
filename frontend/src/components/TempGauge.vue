<template>
    <div class="col circular">
        <h3>{{ title }}</h3>
        <h2 class="temp text-digital" @click="$emit('toggleTemp')">{{ temp }}<small>{{ tempMode === 'celsius' ? '℃' : '℉' }}</small></h2>
        <h2 class="humidity text-digital">{{ humidity }}<small>%</small></h2>
    </div>
</template>

<script setup>
import { toCelsius } from '@/composables/helpers';
import { computed } from '@vue/reactivity';
import { inject } from 'vue';

const props = defineProps({
    temp: String,
    humidity: String,
    title: String,
});
defineEmits(['toggleTemp']);

const tempMode = inject('tempMode');
const temp = computed(() => tempMode.value === 'celsius' ? toCelsius(props.temp ?? 0) : props.temp);
</script>

<style scoped lang="scss">
.temp {
    font-size: 3em;
    font-weight: normal;
    position: absolute;
    left: 20%;
    right: 20%;
    top: 1em;
    padding: 0;
    margin: 0;
    text-align: right;

    small {
        font-size: .3em;
    }
}
.humidity {
    font-size: 2.5em;
    font-weight: normal;
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: 25%;
    padding: 0;
    margin: 0;
    text-align: right;

    small {
        font-size: .3em;
    }
}
</style>