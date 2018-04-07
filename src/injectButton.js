import {getToken} from './githubToken';
import {toggleFilteredFiles, askGithubToken} from './uiHelpers';
import getRelevantFiles from './getRelevantFiles';

let buttonToggle = true
const getButtonText = (numOfFiles) => buttonToggle ? `Show my files (${numOfFiles})` : 'Show all files'

const createButton = (disabled) => {
    const button = document.createElement('button');
    button.disabled = disabled
    button.className = 'diffbar-item btn btn-sm btn-secondary tooltipped tooltipped-s codeowners-btn';
    button.setAttribute('aria-label', disabled ? 'CODEOWNERS-EXT: This repo requires a github token' : 'CODEOWNERS-EXT: Filter files based on CODEOWNERs');
    button.innerHTML = getButtonText('?');
    return button
}

const getCodeownersButton = async (prUrl) => {
    let hasToken = !!getToken()
    if (!hasToken) askGithubToken()
    hasToken = !!getToken()
    
    const button = createButton(!hasToken);
    let files = hasToken ? await getRelevantFiles(prUrl) : [];
    
    button.innerHTML = getButtonText(files.length);
    button.onclick = () => {
        if (getToken()) {
            buttonToggle = !buttonToggle 
            button.innerHTML = getButtonText(files.length);
            toggleFilteredFiles(files);
        } else {
            askGithubToken();
        }
    };

    return button;
};

const injectButton = async (prUrl) => {
    const codeownersButton = await getCodeownersButton(prUrl)
    
    const container = document.querySelector(
        '#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools',
    );
    container.insertBefore(codeownersButton, container.firstChild);
};


export default injectButton;
