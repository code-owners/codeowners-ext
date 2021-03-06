export const getToken = () => {
    return new Promise(function(resolve) {
        chrome.storage.sync.get('oauth_token', ({oauth_token}) => {
            resolve(oauth_token);
        });
    });
};

export const getGithubAuth = async () => ({
    type: 'token',
    token: await getToken(),
});