import getConfig from "./getConfig";

export default async function () {
    const config = await getConfig();
    return await (await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + config.lat + '&longitude=' + config.lng + '&hourly=weather_code,is_day&daily=weather_code&timezone='+ encodeURI(config.timezone) +'&forecast_days=1')).json();
}