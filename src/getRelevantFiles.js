import {Codeowner} from 'codeowners-api';
import {getToken} from './githubToken';

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
            token: getToken(),
        },
    );

    const files = getChangedFiles();
    const user = getUser();

    return await codeowner.filterForCodeOwner(files, user);
};

export default getRelevantFiles;
