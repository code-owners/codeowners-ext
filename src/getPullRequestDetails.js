const getPullRequestDetails = () => {
    const pathParts = window.location.pathname.split('/');

    return {
        owner: pathParts[1],
        repo: pathParts[2],
        number: pathParts[4],
    };
};

export default getPullRequestDetails;
