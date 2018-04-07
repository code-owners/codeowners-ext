import getRelevantFiles from './getRelevantFiles';
import {setToken} from './githubToken';

const toggleElementDisplay = element => {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
};

const getFileName = ele => ele.querySelector('div.file-header.js-file-header > div.file-info > a').title;

export const toggleFilteredFiles = (relevantFiles) => {
    const files = document.querySelectorAll('#files > div > div');
    files.forEach(x => !relevantFiles.includes(getFileName(x)) && toggleElementDisplay(x));
};

export const askGithubToken = () => {
    const token = prompt('For code-owners extension to work, please enter github token:');
    if (!token) return;
    setToken(token);
};
