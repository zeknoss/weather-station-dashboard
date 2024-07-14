<template>
    <div class="forecast" v-if="forecast">
        <header>
            <h3>Forecast</h3>
            <a href="#" @click.prevent="viewMode='hourly'" :class="{active: viewMode === 'hourly'}">Hourly</a>
            <a href="#" @click.prevent="viewMode='daily'" :class="{active: viewMode === 'daily'}">Daily</a>
        </header>

        <swiper
            v-if="viewMode === 'hourly'"
            :slidesPerView="'auto'"
            :spaceBetween="0"
            :pagination="false"
            :initial-slide="hour"
            class="forecast-list"
        >
            <swiper-slide v-for="n of 33" :class="{active: hour === (n-1)}" class="forecast-item">
                <time class="text-digital">{{ hourDisplay((n-1) % 24) }}</time>
                <div class="forecast-visual" :class="[slug(forecast.hourly.weather_code[(n-1)]), forecast.hourly.is_day[(n-1)] === 1 ? 'day' : 'night']">
                    {{ weather(forecast.hourly.weather_code[(n-1)]) }}
                </div>
                <p class="temperature text-digital">{{ forecast.hourly.temperature_2m[(n-1)] }}<unit :mode="tempMode" /></p>
            </swiper-slide>
        </swiper>
        <swiper
            v-if="viewMode === 'daily'"
            :slidesPerView="'auto'"
            :spaceBetween="0"
            :pagination="false"
            class="forecast-list"
        >
            <swiper-slide v-for="day of forecastDays" :class="{active: day === 1}" class="forecast-item">
                <time class="text-digital">{{ dateDisplay(forecast.daily.time[(day-1)]) }}</time>
                <div class="forecast-visual" :class="[slug(forecast.daily.weather_code[(day-1)]), 'day']">
                    {{ weather(forecast.daily.weather_code[(day-1)]) }}
                </div>
                <p class="temperature text-digital">{{ forecast.daily.temperature_2m_min[(day-1)] }}<unit :mode="tempMode" />&nbsp;/&nbsp;{{ forecast.daily.temperature_2m_max[(day-1)] }}<unit :mode="tempMode" /></p>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Unit from './Unit.vue';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import parseWeatherCode, { parseWeatherSlug } from '@/composables/parseWeatherCode';

const props = defineProps({
    forecast: 'required',
    tempMode: String,
});

const viewMode = ref('hourly');

const forecastDays = computed(() => props.forecast?.daily?.time?.length ?? 0);

let hour = ref((new Date).getHours());
setInterval(() => hour.value = (new Date).getHours(), 5000);

const slug = (code) => parseWeatherSlug(code);
const weather = (code) => parseWeatherCode(code);
const hourDisplay = (hour) => (hour < 10) ? '0' + hour + ':00' : hour + ':00';
const dateDisplay = (date) => (new Date(date)).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit' });
</script>

<style lang="scss" scoped>
.forecast {
    padding-top: 2em;
    width: 100%;
    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        h3 {
            margin: 0 .5em 0 0;
        }

        a {
            display: inline-block;
            border-radius: 0.3em;
            padding: .3em 0;
            text-decoration: none;
            color: #fff;
            margin: 0 .3em;

            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }

            &.active {
                background: rgba(#fff, 0.3);
                padding: .3em .5em;
            }
        }
    }

    .forecast-list {
        height: 10em;
        flex-grow: 1;
        list-style: none;
        cursor: grab;
        margin-top: 1em;

        .forecast-item {
            display: inline-block;
            width: 10em;
            height: 10em;
            text-align: center;
            border-left: 1px solid rgba(#fff, 0.3);
            position: relative;

            &.active {
                background: rgba(#fff, 0.3);
            }

            &:first-child {
                border-left: 0;
            }

            .temperature {
                font-size: 1.2em;
            }

            time {
                position: absolute;
                left: 0;
                top: 0;
                background: #2d62b7;
                color: #fff;
                text-transform: uppercase;
                padding: 3px 5px;
                font-size: 0.8em;
                z-index: 1;
            }

            .forecast-visual {
                padding-top: 5em;
                background: no-repeat;
                background-size: contain;
                background-position: 50% 0%;

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
        }
    }
}
</style>