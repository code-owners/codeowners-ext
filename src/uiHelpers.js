import getRelevantFiles from './getRelevantFiles';

const toggleElementDisplay = element => {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
};

const getFileName = ele => ele.querySelector('div.file-header.js-file-header > div.file-info > a').text;

export const toggleFilteredFiles = async () => {
    const relevantFiles = await getRelevantFiles();
    const files = document.querySelectorAll('#files > div > div');
    files.forEach(x => !relevantFiles.includes(getFileName(x)) && toggleElementDisplay(x));
};

export const askGithubToken = () => {
    const token = prompt('Please enter github token:');
    if (!token) return;

    localStorage.setItem('codeowners.accessToken', token);
};
