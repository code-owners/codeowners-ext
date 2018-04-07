import injectButton from './injectButton';
import getRelevantFiles from './getRelevantFiles';
import {setToken} from './githubToken';

const execute = (prUrl) => {
    try {
        getRelevantFiles(prUrl);
    } catch (e) { }
    injectButton(prUrl);
}    

const isFilesSection = () => window.location.href.replace(/\?.*/i, '').endsWith('/files')

// From Inner Navigation
chrome.runtime.onMessage.addListener(
    function (request, sender) {
        console.log('Got a call from', request)
        if (request.codeowners == 'background') execute(request.location)
        else if (request.codeowners == 'popup') setToken(request.token)
    });

// From URL
if (isFilesSection()) execute(window.location.href)


