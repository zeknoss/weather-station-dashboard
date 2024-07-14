async function setThemeUrl() {
    const el = document.getElementById('iframe');
    const settings = await browser.storage.local.get('weather_dashboard');
    const url = settings.weather_dashboard.url ?? 'https://weather.burakgurbuz.com';
    el.setAttribute('src', url);
}

browser.runtime.onMessage.addListener(eventData => {
    if (eventData.action === 'dashboard-url-changed') setThemeUrl();
});
setThemeUrl();

if (eventData.action === 'dashboard-url-changed') {
    browser.runtime.sendMessage({
        action: 'dashboard-url-changed'
    });
}