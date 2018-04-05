import injectButton from './injectButton';
import getRelevantFiles from './getRelevantFiles';

const execute = (prUrl) => {
    try {
        getRelevantFiles(prUrl);
    } catch (e) { }
    injectButton(prUrl);
}    

const isFilesSection = () => window.location.href.endsWith('/files')

// From Inner Navigation
chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.codeowners == 'background') execute(request.location)
    });

// From URL
if (isFilesSection()) execute(window.location.href)


