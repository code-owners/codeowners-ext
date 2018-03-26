// const {Codeowner} = require('codeowners-api');

const getGithubToken = () => localStorage.getItem('codeowners.accessToken');

const getChangedFiles = () => {
    const fileHeaders = document.querySelectorAll('div.file-header.js-file-header > div.file-info > a');
    const paths = [];
    fileHeaders.forEach(x => paths.push(x.text));

    return paths;
};

const getUser = () => document.querySelector('meta[name="user-login"]').content;

const getRelevantFiles = async () => {
    const pathParts = window.location.pathname.split('/');

    const codeowner = new Codeowner(
        {
            owner: pathParts[1],
            repo: pathParts[2],
        },
        {
            type: 'token',
            token: '<token>',
        },
    );

    const files = getChangedFiles();
    const user = getUser();

    console.log(await codeowner.filterForCodeOwner(files, user));
};

const toggleElementDisplay = element => {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
};

const toggleFilteredFiles = () => {
    const files = document.querySelectorAll('#files > div > div');
    files.forEach(x => toggleElementDisplay(x));
};

const askGithubToken = () => {
    const token = prompt('Please enter github token:');
    localStorage.setItem('codeowners.accessToken', token);
};

const getCodeownersButton = () => {
    const button = document.createElement('button');
    button.className = 'diffbar-item btn btn-sm btn-secondary codeowners-btn';
    button.innerHTML = 'Show my files';
    button.onclick = () => {
        if (getGithubToken()) {
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

injectButton();
