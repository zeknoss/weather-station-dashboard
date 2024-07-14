browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.toggle();
});

browser.runtime.onMessage.addListener(function(eventData) {
    if (eventData.action === 'dashboard-url-changed') {
        browser.runtime.sendMessage({
            action: 'dashboard-url-changed'
        });
    }
});
