import {Codeowner} from 'codeowners-api';
import {getToken} from './githubToken';

const isRenamedFile = title => title.indexOf('→') > 0 && title.split('→')[0].trim()
const getChangedFiles = () => {
    const fileHeaders = document.querySelectorAll('div.file-header.js-file-header > div.file-info > a');
    const paths = [];
    fileHeaders.forEach(x => paths.push(isRenamedFile(x.title) || x.title));
    return paths;
};

const getUser = () => document.querySelector('meta[name="user-login"]').content;

let relevantFiles = {};
const getRelevantFiles = async (prUrl) => {
    if (relevantFiles[prUrl]) return relevantFiles[prUrl];

    const pathParts = window.location.pathname.split('/');

    const githubToken = getToken();
    if (!githubToken) throw new Error('There is no Github token.');

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

    relevantFiles[prUrl] = await codeowner.filterForAuthenticatedUser(files, user);

    return relevantFiles[prUrl];
};

export default getRelevantFiles;
