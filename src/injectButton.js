import {Codeowner} from 'codeowners-api';
import {getToken} from './githubAuth';
import {toggleFilteredFiles, askGithubToken} from './uiHelpers';
import getRelevantFiles from './getRelevantFiles';
import doesRepoHasCodeowners from './doesRepoHasCodeowners';

let showMyFiles = true;
const getButtonText = numOfFiles => {
    return showMyFiles ? `Show my files ${numOfFiles >= 0 ? `(${numOfFiles})` : '(?)'}` : 'Show all files';
};

const buttonExists = () => !!document.getElementById('codeowners-btn');

const createBaseButton = (text, tooltipText) => {
    const button = document.createElement('button');
    button.className = 'diffbar-item btn btn-sm btn-secondary tooltipped tooltipped-s codeowners-btn';
    button.id = 'codeowners-btn';
    button.innerHTML = text;
    button.setAttribute('aria-label', tooltipText);

    return button;
};

const createButtonWithToken = () => {
    return createBaseButton(getButtonText(), 'Filter files based on CODEOWNERS');
};

const createButtonWithoutToken = () => {
    const button = createBaseButton('Show my files', 'CODEOWNERS-EXT: This repo requires a github token');
    button.onclick = () => {
        const url = chrome.extension.getURL('popup/popup.html');
        const w = window.open(url, '_blank', 'width=350,height=300,0,status=0');
    };

    return button;
};

const createButtonWhenNoCodeowners = () => {
    const button = createBaseButton('No Codeowners files', 'CODEOWNERS-EXT: This repo does not have Codeowners');
    button.disabled = true;

    return button;
};

const updateFilesCount = async prUrl => {
    const files = await getRelevantFiles(prUrl);

    const button = document.querySelector('#codeowners-btn');
    button.innerHTML = getButtonText(files.length);
    button.onclick = () => {
        showMyFiles = !showMyFiles;
        button.innerHTML = getButtonText(files.length);
        toggleFilteredFiles(files);
    };
};

const injectButton = async prUrl => {
    if (buttonExists()) return;

    const hasToken = !!await getToken();
    let codeownersButton;
    let hasCodeowners;
    if (!hasToken) {
        codeownersButton = createButtonWithoutToken;
    } else {
        hasCodeowners = await doesRepoHasCodeowners();
        codeownersButton = hasCodeowners ? createButtonWithToken() : createButtonWhenNoCodeowners();
    }
    const container = document.querySelector(
        '#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools',
    );
    container.insertBefore(codeownersButton, container.firstChild);

    hasToken && hasCodeowners && (await updateFilesCount(prUrl));
};

export default injectButton;
