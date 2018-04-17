import {getToken} from './githubToken';
import {toggleFilteredFiles, askGithubToken} from './uiHelpers';
import getRelevantFiles from './getRelevantFiles';

let showMyFiles = true;
const getButtonText = numOfFiles =>
    showMyFiles ? `Show my files ${numOfFiles >= 0 ? `(${numOfFiles})` : '(?)'}` : 'Show all files';
const buttonExists = () => !!document.getElementById('codeowners-btn');

const createBaseButton = () => {
    const button = document.createElement('button');
    button.className = 'diffbar-item btn btn-sm btn-secondary tooltipped tooltipped-s codeowners-btn';
    button.id = 'codeowners-btn';
    button.innerHTML = getButtonText('?');

    return button;
};

const createButtonWithToken = () => {
    const button = createBaseButton();
    button.innerHTML = getButtonText();
    button.setAttribute('aria-label', 'Filter files based on CODEOWNERS');

    return button;
};

const createButtonWithoutToken = () => {
    const button = createBaseButton();
    button.innerHTML = 'Show my files';
    button.setAttribute('aria-label', 'CODEOWNERS-EXT: This repo requires a github token');
    button.onclick = () => {
        const url = chrome.extension.getURL('popup/popup.html');
        const w = window.open(url, '_blank', 'width=350,height=350,0,status=0');
    };

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
    const codeownersButton = hasToken ? createButtonWithToken() : createButtonWithoutToken();
    const container = document.querySelector(
        '#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools',
    );
    container.insertBefore(codeownersButton, container.firstChild);

    hasToken && (await updateFilesCount(prUrl));
};

export default injectButton;
