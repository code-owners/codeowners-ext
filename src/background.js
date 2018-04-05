
let lastTriggered;


chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    if (isFilesSection(details.url)) {
        if (!alreadyTriggered(details.url)) {
            lastTriggered = details.url
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                notifyContentScript(tabs, details.url)
            });
        }
    } else {
        lastTriggered = null
    }
});

// Due to bug in chrome that fires twice on same event
const alreadyTriggered = (url) => url === lastTriggered

const notifyContentScript = (tabs, triggerUrl) => tabs[0] && chrome.tabs.sendMessage(tabs[0].id, { codeowners: 'background', location: triggerUrl });

const isFilesSection = (url) => url && url.indexOf('github.com') > 0 && url.endsWith('/files')