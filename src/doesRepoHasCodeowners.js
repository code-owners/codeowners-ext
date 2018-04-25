import {Codeowner} from 'codeowners-api';
import getPullRequestDetails from './getPullRequestDetails';
import {getGithubAuth} from './githubAuth';

const doesRepoHaveCodeowners = async () => {
    const prDetails = getPullRequestDetails();
    const auth = await getGithubAuth();

    const codeowner = new Codeowner(
        {
            owner: prDetails.owner,
            repo: prDetails.repo,
        },
        auth,
    );

    return await codeowner.codeownersFileExists();
};

export default doesRepoHaveCodeowners;
