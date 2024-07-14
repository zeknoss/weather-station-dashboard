import getConfig from "./getConfig";

export default async function () {
    const config = await getConfig();
    return await (await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + config.lat + '&longitude=' + config.lng + '&hourly=weather_code,precipitation_probability,precipitation,is_day,temperature_2m&daily=weather_code,precipitation_sum,precipitation_probability_max,temperature_2m_max,temperature_2m_min&timezone='+ encodeURI(config.timezone) +'&forecast_days=14')).json();
}