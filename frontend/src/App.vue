<template>
    <div class="wrapper" :class="[isDay ? 'day' : 'night', 'weather-' + weatherSlug]">
        <aside>
            <a href="#" @click.prevent="toggleTemp">
                <span>
                    <small>Temp Unit</small>
                    {{ tempMode === 'celsius' ? '℃' : '℉' }}
                </span>
            </a>
            <a href="#" @click.prevent="toggleWind">
                <span>
                    <small>Wind Unit</small>
                    {{ windUnit }}
                </span>
            </a>
        </aside>
        <main v-if="data">
            <header></header>
            <div class="row">
                <TempGauge :temp="data.tempf ?? 0" :humidity="data.humidity ?? 0" title="Outdoor" @toggle-temp="toggleTemp" />
                <WindGauge :gust="data.windgustmph ?? 0" :angle="parseFloat(data.winddir) ?? 0" @toggle-mode="toggleWind" />
                <ForecastGauge :pressure="parseFloat(data.baromin) ?? 0" :weather="weather" :slug="weatherSlug" :is-day="isDay" />
                <TempGauge :temp="data.indoortempf ?? 0" :humidity="data.indoorhumidity ?? 0" title="Indoor" @toggle-temp="toggleTemp" />
            </div>
            <div class="row wide-gap">
                <HeatIndex :temp="parseFloat(data.tempf ?? 0, 2)" :humidity="parseFloat(data.humidity ?? 0, 2)" @toggle-temp="toggleTemp" />
                <UvIndex :radiation="parseFloat(data.solarradiation ?? 0)" :uv-index="parseFloat(data.UV ?? 0, 2)" />
                <RainGauge :rain-in="parseFloat(data.rainin ?? 0, 1)" :daily-rain-in="parseFloat(data.dailyrainin ?? 0, 1)" />
            </div>
            <footer>Last Updated: {{ data.last_modified }}</footer>
        </main>
    </div>
</template>

<script setup>
import { ref, nextTick, computed, provide } from 'vue';
import TempGauge from './components/TempGauge.vue';
import ForecastGauge from './components/ForecastGauge.vue';
import WindGauge from './components/WindGauge.vue';
import getForecast from './composables/getForecast';
import parseWeatherCode, { parseWeatherSlug } from './composables/parseWeatherCode';
import UvIndex from './components/UvIndex.vue';
import HeatIndex from './components/HeatIndex.vue';
import RainGauge from './components/RainGauge.vue';
import StorageRepo from './composables/storage';

const data = ref(null);
const forecast = ref(null);
const isDay = computed(() => {
    if (!forecast.value) return false;
    return forecast.value.hourly.is_day[(new Date).getHours()] === 1;
});
const weatherSlug = computed(() => parseWeatherSlug((!forecast.value) ? 0 : forecast.value.hourly.weather_code[(new Date).getHours()]));
const weather = computed(() => parseWeatherCode((!forecast.value) ? 0 : forecast.value.hourly.weather_code[(new Date).getHours()]));

const fetchData = async () => {
    data.value = await (await fetch('https://weather.burakgurbuz.com/report.php')).json();
};

const tempMode = ref(StorageRepo.get('tempMode', 'celsius'));
provide('tempMode', tempMode);
const toggleTemp = () => {
    tempMode.value = (tempMode.value === 'celsius') ? 'fahrenheit' : 'celsius';
    StorageRepo.set('tempMode', tempMode.value);
};
const windUnit = ref(StorageRepo.get('windUnit', 'km/h'));
provide('windUnit', windUnit);
const toggleWind = () => {
    switch (windUnit.value) {
        case 'km/h':
            windUnit.value = 'mph';
            break;
        case 'mph':
            windUnit.value = 'knots';
            break;
        case 'knots':
            windUnit.value = 'km/h';
            break;
    }
    StorageRepo.set('windUnit', windUnit.value);
};

nextTick(async () => {
    fetchData();
    forecast.value = await getForecast();
});
setInterval(async () => forecast.value = await getForecast(), 1000 * 60 * 60);
setInterval(fetchData, 10000);
</script>
