chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (isFilesSection(details.url)) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            notifyContentScript(tabs, details.url);
        });
    } else {
        lastTriggered = null;
    }
});

const notifyContentScript = (tabs, triggerUrl) =>
    tabs[0] && chrome.tabs.sendMessage(tabs[0].id, {codeowners: 'background', location: triggerUrl});

const isFilesSection = url => url && url.indexOf('github.com') > 0 && url.replace(/\?.*/i, '').endsWith('/files');
