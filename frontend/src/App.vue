<template>
    <div class="wrapper" :class="[isDay ? 'day' : 'night', 'weather-' + weatherSlug]">
        <aside>
            <a href="#" @click.prevent="toggleTemp">
                <span>
                    <small>{{ $t('temp_unit') }}</small>
                    <Unit :mode="tempMode" tag="span" />
                </span>
            </a>
            <a href="#" @click.prevent="toggleWind">
                <span>
                    <small>{{ $t('wind_unit') }}</small>
                    {{ windUnit }}
                </span>
            </a>
            <a href="#" @click.prevent="toggleLocale">
                <span>
                    <small>{{ $t('locale') }}</small>
                    {{ $i18n.locale }}
                </span>
            </a>
            <a :href="weatherUrl" target="_blank">
                <svg set="nav" name="twc-logo" theme="light" class="MainMenuHeader--twcLogo--3Ovn0 Icon--icon--2aW0V Icon--lightTheme--2Ktm2" data-testid="Icon" aria-label="The Weather Company - Ev" viewBox="0 0 24 24"><title>The Weather Channel</title><path d="M0 0h24v24H0V0zm2.0433 6.807v.657h.9629v3.2794h.8043V7.464h.9402l.1303-.657H2.0433zm3.0982-.0794c.034.119.0567.3908.0567.6627v3.3531h.7703V8.6647c.1699-.1529.4134-.2662.6003-.2662.2153 0 .2946.1076.2946.3965v1.9484h.742V8.7157c0-.3285-.017-.3738-.0737-.538-.0906-.2436-.3965-.4136-.7533-.4136-.2945 0-.623.1246-.8213.3116 0-.034.0114-.153.0114-.2436v-.5777c0-.2776-.017-.5494-.051-.708l-.776.1812zm5.1655 3.2455c-.2322.1926-.4758.2889-.7363.2889-.3908 0-.6117-.2549-.6117-.7024V9.537h1.6765v-.1756c0-.606-.119-.9969-.3851-1.2687-.187-.1926-.5041-.3059-.8383-.3059-.3852 0-.674.1246-.9119.3908-.2549.2832-.3625.6287-.3625 1.1498 0 .912.538 1.501 1.3707 1.501.4078 0 .759-.1303 1.0931-.4022l-.2945-.453zm-8.241 2.1964l.9402 3.9704h.9005l.323-1.6142c.1132-.5778.1925-1.1328.1925-1.1328.0057.034.051.5324.1869 1.1441l.3512 1.6029h.8666l.9515-3.9704h-.8326l-.3228 1.4952c-.068.3286-.204 1.1838-.2153 1.3084 0 0-.0963-.674-.1699-1.0421l-.3625-1.7615h-.8666l-.3512 1.5915c-.1189.5438-.1869 1.1045-.2039 1.2575 0 0-.0453-.5608-.2095-1.2971l-.3399-1.552H2.066zm7.0172 3.1661c-.2322.1926-.4758.289-.7363.289-.3908 0-.6117-.255-.6117-.7024v-.0227h1.6765v-.1756c0-.606-.119-.9968-.3851-1.2687-.187-.1926-.5041-.3059-.8383-.3059-.3851 0-.674.1246-.9119.3908-.2549.2832-.3625.6287-.3625 1.1498 0 .912.538 1.501 1.3707 1.501.4078 0 .759-.1303 1.0931-.4021l-.2945-.4532zm.742-1.7841l.3228.5437c.3115-.2095.5947-.3285.8383-.3285.2775 0 .3398.1076.3398.4305v.119c-.0792-.0058-.1132-.0058-.1699-.0058-.9232 0-1.3933.3172-1.3933.9969 0 .5777.3511.9063.9968.9063.238 0 .4418-.0567.5834-.1586.0567-.0397.068-.051.1756-.153.0737.1473.2323.2776.4078.3512l.4022-.4644c-.221-.1643-.2719-.2833-.2719-.5948v-.051l.017-.9742c0-.3115-.0113-.402-.051-.521-.1133-.3229-.4474-.5041-.9345-.5041-.2663 0-.5098.051-.793.1699-.204.0793-.2832.119-.4701.2379zm4.4009-.3512h-.6797c0-.2945.017-.606.0453-.8723l-.7703.1926c-.0283.2152-.0283.4078-.0283.691h-.2889v.4928h.2889v1.5973c0 .2661.0056.3228.051.4474.085.2549.3964.4248.7816.4248.1982 0 .3965-.0396.6174-.1303l-.0964-.453c-.1359.0396-.2038.0566-.2718.0566-.2606 0-.3285-.0963-.3285-.4645v-1.4783h.4871l.1926-.5041zm.2095-1.1101c.034.1189.0566.3908.0566.6626v3.3531h.7703v-2.0787c.17-.1529.4135-.2662.6004-.2662.2152 0 .2945.1077.2945.3965v1.9484h.742v-2.0277c0-.3285-.017-.3738-.0736-.538-.0907-.2436-.3965-.4135-.7533-.4135-.2946 0-.623.1246-.8213.3115 0-.034.0113-.153.0113-.2435v-.5778c0-.2775-.017-.5494-.051-.708l-.776.1813zm5.1654 3.2454c-.2322.1926-.4757.289-.7363.289-.3908 0-.6117-.255-.6117-.7024v-.0227h1.6765v-.1756c0-.606-.1189-.9968-.385-1.2687-.187-.1926-.5042-.3059-.8383-.3059-.3852 0-.674.1246-.912.3908-.2548.2832-.3625.6287-.3625 1.1498 0 .912.5381 1.501 1.3707 1.501.4078 0 .759-.1303 1.0932-.4021l-.2946-.4532zm.7817-2.0163c.0623.1642.1076.4587.1076.8495v1.9371h.759v-2.0503c.1415-.1643.2945-.2436.4644-.2436.085 0 .1472.017.2209.0567l.2096-.6684c-.119-.051-.17-.0623-.2833-.0623-.085 0-.1869.017-.2492.0453-.1415.068-.3228.221-.4304.3682-.0113-.1643-.051-.2945-.119-.4135l-.6796.1813zM4.9489 17.7585c-.2152-.1869-.606-.3115-.9968-.3115-.6344 0-1.2008.3399-1.5067.912-.1812.3398-.2662.7306-.2662 1.2233 0 .5778.1586 1.0536.4758 1.4104.3229.3682.742.5437 1.2857.5437.4475 0 .7817-.1132 1.0932-.3681l-.3625-.4985a3.6136 3.6136 0 0 1-.0793.0624c-.1926.1302-.3795.1925-.5947.1925-.3399 0-.6004-.1529-.759-.4418-.119-.2152-.1642-.5154-.1642-1.0535 0-.4588.068-.7873.2209-1.0138.1416-.2096.402-.3399.6683-.3399.2209 0 .4305.0737.6287.221l.3568-.5382zm.3908-.3058c.034.119.0566.3908.0566.6627v3.353h.7703v-2.0786c.17-.153.4135-.2662.6004-.2662.2152 0 .2945.1076.2945.3964v1.9485h.742v-2.0277c0-.3286-.017-.3739-.0736-.5381-.0906-.2436-.3965-.4135-.7533-.4135-.2946 0-.623.1246-.8213.3115 0-.034.0113-.153.0113-.2435v-.5778c0-.2775-.017-.5494-.051-.708l-.776.1813zm3.0755 1.4613l.3228.5437c.3115-.2095.5947-.3285.8383-.3285.2775 0 .3398.1077.3398.4305v.119c-.0793-.0057-.1133-.0057-.17-.0057-.9231 0-1.3932.3171-1.3932.9968 0 .5778.3511.9063.9968.9063.2379 0 .4418-.0567.5834-.1586.0566-.0397.068-.051.1756-.153.0736.1473.2322.2776.4078.3512l.4021-.4644c-.2209-.1643-.2718-.2832-.2718-.5947v-.051l.017-.9742c0-.3116-.0114-.4022-.051-.5211-.1133-.3229-.4475-.5041-.9346-.5041-.2662 0-.5097.051-.793.17-.2038.0792-.2831.1189-.47.2378zm2.8546-.2266c.068.1926.102.4305.102.6797v2.1014h.7589V19.418c.1756-.1586.3738-.2606.5267-.2606.1983 0 .255.0963.255.4248v1.8862h.7476V19.35c0-.1812-.017-.3058-.0567-.4134-.0906-.2493-.3738-.4192-.6966-.4192-.17 0-.3682.0453-.5211.1246-.1246.068-.1586.0907-.3342.2152 0-.1189-.0397-.2435-.1076-.3624l-.674.1925zm3.0188 0c.068.1926.102.4305.102.6797v2.1014h.759V19.418c.1755-.1586.3737-.2606.5267-.2606.1982 0 .2549.0963.2549.4248v1.8862h.7476V19.35c0-.1812-.017-.3058-.0566-.4134-.0906-.2493-.3739-.4192-.6967-.4192-.17 0-.3681.0453-.521.1246-.1247.068-.1587.0907-.3342.2152 0-.1189-.0397-.2435-.1077-.3624l-.674.1925zm5.0806 2.0108c-.2323.1925-.4758.2888-.7364.2888-.3908 0-.6117-.2548-.6117-.7023v-.0226h1.6766v-.1757c0-.606-.119-.9968-.3852-1.2687-.1869-.1926-.504-.3058-.8382-.3058-.3852 0-.674.1246-.912.3908-.2548.2832-.3625.6287-.3625 1.1497 0 .912.5381 1.501 1.3707 1.501.4078 0 .759-.1302 1.0932-.4021l-.2945-.4531zm1.5859-3.421l-.776.1755c.0283.2605.0397.4927.0397.8722v2.1637c0 .4135.0113.504.068.6513.0905.2436.3511.3965.674.3965.1642 0 .3228-.0283.453-.0792l-.1302-.4532c-.0396.0113-.0566.0113-.085.0113-.0623 0-.1246-.0283-.1529-.0792-.0453-.0793-.051-.1473-.051-.6458v-2.2599c0-.4078-.0113-.5947-.0396-.7533zM8.9703 8.9818h.878v-.034c0-.2152-.0227-.3285-.0907-.4361-.0736-.1133-.1813-.17-.3342-.17-.2888 0-.453.2266-.453.6288v.0113zm-1.2238 5.3625h.878v-.034c0-.2152-.0227-.3285-.0907-.436-.0736-.1134-.1812-.17-.3342-.17-.2888 0-.4531.2266-.4531.6287v.0113zm3.5683.4928h-.034c-.5267 0-.708.0963-.708.4418 0 .2265.1416.3795.3342.3795.1416 0 .2832-.0737.3965-.1983l.0113-.623zm6.9495-.4928h.878v-.034c0-.2152-.0227-.3285-.0907-.436-.0736-.1134-.1812-.17-.3341-.17-.2889 0-.4532.2266-.4532.6287v.0113zm-8.3595 5.8553h-.034c-.5268 0-.708.0963-.708.4418 0 .2266.1416.3795.3342.3795.1416 0 .2832-.0736.3965-.1982l.0113-.623zm8.1277-.4927h.8779v-.034c0-.2153-.0227-.3285-.0906-.4361-.0737-.1133-.1813-.17-.3342-.17-.2889 0-.4531.2266-.4531.6287v.0114z" fill="currentColor" fill-rule="evenodd"></path></svg>
            </a>
            <a :href="mgmUrl" target="_blank">
                <img src="/images/mgm-logo.svg" />
            </a>
        </aside>
        <main v-if="data">
            <div class="row">
                <TempGauge :temp="data.tempf ?? 0" :humidity="data.humidity ?? 0" :title="$t('outdoor')" :temp-mode="tempMode" @toggle-temp="toggleTemp" />
                <WindGauge :gust="data.windgustmph ?? 0" :angle="parseFloat(data.winddir) ?? 0" @toggle-mode="toggleWind" :wind-unit="windUnit" />
                <ForecastGauge :pressure="parseFloat(data.baromin) ?? 0" :weather="$t('weather_code.' + weather)" :slug="weatherSlug" :is-day="isDay" />
                <TempGauge :temp="data.indoortempf ?? 0" :humidity="data.indoorhumidity ?? 0" :temp-mode="tempMode" :title="$t('indoor')" @toggle-temp="toggleTemp" />
            </div>
            <div class="row wide-gap">
                <HeatIndex :temp="parseFloat(data.tempf ?? 0, 2)" :humidity="parseFloat(data.humidity ?? 0, 2)" :temp-mode="tempMode" @toggle-temp="toggleTemp" />
                <UvIndex :radiation="parseFloat(data.solarradiation ?? 0)" :uv-index="parseFloat(data.UV ?? 0, 2)" />
                <RainGauge :rain-in="parseFloat(data.rainin ?? 0, 1)" :daily-rain-in="parseFloat(data.dailyrainin ?? 0, 1)" />
                <HeatIndex :temp="parseFloat(data.indoortempf ?? 0, 2)" :humidity="parseFloat(data.indoorhumidity ?? 0, 2)" :temp-mode="tempMode" @toggle-temp="toggleTemp" />
            </div>
            <weather-forecast :forecast="forecast" :temp-mode="tempMode" />
            <footer>{{ $t('last_updated') }} {{ (new Date(data.last_modified)).toLocaleString() }}</footer>
        </main>
    </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue';
import TempGauge from './components/TempGauge.vue';
import ForecastGauge from './components/ForecastGauge.vue';
import WindGauge from './components/WindGauge.vue';
import getForecast from './composables/getForecast';
import { parseWeatherSlug } from './composables/parseWeatherCode';
import UvIndex from './components/UvIndex.vue';
import HeatIndex from './components/HeatIndex.vue';
import RainGauge from './components/RainGauge.vue';
import StorageRepo from './composables/storage';
import WeatherForecast from './components/WeatherForecast.vue';
import Unit from './components/Unit.vue';
import { toggleLocale } from './composables/i18n';

const weatherUrl = import.meta.env.VITE_WEATHER_LOCAL_URL;
const mgmUrl = import.meta.env.VITE_MGM_LOCAL_URL;
const data = ref(null);
const forecast = ref(null);
const isDay = computed(() => {
    if (!forecast.value) return false;
    return forecast.value.hourly.is_day[(new Date).getHours()] === 1;
});
const weatherSlug = computed(() => parseWeatherSlug((!forecast.value) ? 0 : forecast.value.hourly.weather_code[(new Date).getHours()]));
const weather = computed(() => (!forecast.value) ? 0 : forecast.value.hourly.weather_code[(new Date).getHours()]);

const fetchData = async () => {
    data.value = await (await fetch(import.meta.env.VITE_APP_URL + 'report.php')).json();
};

const tempMode = ref(StorageRepo.get('tempMode', 'celsius'));

const toggleTemp = () => {
    tempMode.value = (tempMode.value === 'celsius') ? 'fahrenheit' : 'celsius';
    StorageRepo.set('tempMode', tempMode.value);
};
const windUnit = ref(StorageRepo.get('windUnit', 'km/h'));

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
