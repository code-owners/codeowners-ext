
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    if (isFilesSection(details.url)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            notifyContentScript(tabs)
        });
    }
});

const notifyContentScript = (tabs) => tabs[0] && chrome.tabs.sendMessage(tabs[0].id, { codeowners: 'background' });

const isFilesSection = (url) => url && url.indexOf('github.com') > 0 && url.endsWith('/files')