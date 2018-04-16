import {Codeowner} from 'codeowners-api';
import * as octokit from '@octokit/rest';
import {getToken} from './githubToken';

const getGithubAuth = token => ({
    type: 'token',
    token,
});

const getPullRequestDetails = prUrl => {
    const pathParts = window.location.pathname.split('/');

    return {
        owner: pathParts[1],
        repo: pathParts[2],
        number: pathParts[4],
    };
};

const getChangedFiles = async (auth, prDetails) => {
    const octo = new octokit();
    octo.authenticate(auth);

    const files = await octo.pullRequests.getFiles(prDetails);

    return files.data.map(x => x.filename);
};

const getUser = () => document.querySelector('meta[name="user-login"]').content;

let relevantFiles = {};
const getRelevantFiles = async prUrl => {
    if (relevantFiles[prUrl]) return relevantFiles[prUrl];

    const githubToken = await getToken();
    if (!githubToken) throw new Error('There is no Github token.');

    const prDetails = getPullRequestDetails(prUrl);

    const auth = getGithubAuth(githubToken);

    const files = await getChangedFiles(auth, prDetails);
    const user = getUser();

    const codeowner = new Codeowner(
        {
            owner: prDetails.owner,
            repo: prDetails.repo,
        },
        auth,
    );
    relevantFiles[prUrl] = await codeowner.filterForAuthenticatedUser(files, user);

    return relevantFiles[prUrl];
};

export default getRelevantFiles;
