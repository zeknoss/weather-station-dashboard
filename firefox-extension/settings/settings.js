const dashboardUrlEl = document.getElementById('weather_dashboard_url');

function loadSavedData(data) {
    dashboardUrlEl.value = data.weather_dashboard.url ?? 'https://weather.burakgurbuz.com';
}

function saveSettings() {
    browser.storage.local.set({weather_dashboard: {
        url: dashboardUrlEl.value
    }}).then(() => browser.runtime.sendMessage({action: 'dashboard-url-changed'}));
}

document.addEventListener('DOMContentLoaded', function() {
    browser.storage.local.get('weather_dashboard').then(data => {
        loadSavedData(data);
    });
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.onclick = saveSettings;
});
