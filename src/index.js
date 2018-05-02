import injectButton from './injectButton';
import getRelevantFiles from './getRelevantFiles';

const execute = prUrl => {
    getRelevantFiles(prUrl).catch(() => {});
    injectButton(prUrl);
};

const isFilesSection = () => window.location.href.replace(/\?.*/i, '').endsWith('/files');

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.codeowners == 'background') execute(request.location);
});

// From URL
if (isFilesSection()) execute(window.location.href);



