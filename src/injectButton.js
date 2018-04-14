import {getToken} from './githubToken';
import {toggleFilteredFiles, askGithubToken} from './uiHelpers';
import getRelevantFiles from './getRelevantFiles';

let showMyFiles = true
const getButtonText = (numOfFiles) => showMyFiles ? `Show my files (${numOfFiles})` : 'Show all files'
const buttonExists = () => !!document.getElementById('codeowners-btn')

const createButton = (disabled) => {
    const button = document.createElement('button');
    button.disabled = disabled
    button.className = 'diffbar-item btn btn-sm btn-secondary tooltipped tooltipped-s codeowners-btn';
    button.id = 'codeowners-btn';
    button.setAttribute('aria-label', disabled ? 'CODEOWNERS-EXT: This repo requires a github token' : 'Filter files based on CODEOWNERS');
    button.innerHTML = getButtonText('?');
    return button
}

const getCodeownersButton = async (prUrl) => {
    const hasToken = !!(await getToken())    

    const button = createButton(!hasToken);
    let files = hasToken ? await getRelevantFiles(prUrl) : [];
    
    button.innerHTML = getButtonText(files.length);
    button.onclick = () => {
        button.innerHTML = getButtonText(files.length);
        toggleFilteredFiles(files);
        showMyFiles = !showMyFiles 
    };

    return button;
};

const injectButton = async (prUrl) => {
    if (buttonExists()) return
    const codeownersButton = await getCodeownersButton(prUrl)
    
    const container = document.querySelector(
        '#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools',
    );
    container.insertBefore(codeownersButton, container.firstChild);
};


export default injectButton;
