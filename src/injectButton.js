import {getToken} from './githubToken';
import {toggleFilteredFiles, askGithubToken} from './uiHelpers';

const getCodeownersButton = () => {
    const button = document.createElement('button');
    button.className = 'diffbar-item btn btn-sm btn-secondary codeowners-btn';
    button.innerHTML = 'Show my files';
    button.onclick = () => {
        if (getToken()) {
            toggleFilteredFiles();
        } else {
            askGithubToken();
        }
    };

    return button;
};

const injectButton = () => {
    const container = document.querySelector(
        '#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools',
    );
    container.insertBefore(getCodeownersButton(), container.firstChild);
};

export default injectButton;
