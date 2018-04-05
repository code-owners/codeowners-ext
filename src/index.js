import injectButton from './injectButton';
import getRelevantFiles from './getRelevantFiles';


const execute = () => {
    try {
        getRelevantFiles();
    } catch (e) { }

    injectButton();
}    

const isFilesSection = () => window.location.href.endsWith('/files')

// From Navigation
chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (request.codeowners == 'background') execute()
    });

// Send message to background when are at github.com
if (isFilesSection()) execute()


