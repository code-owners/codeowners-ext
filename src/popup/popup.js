const githubTokenInput = document.getElementById('github_token');

const handleSuccess = () => window.close();

const saveToken = () => {
  var oauth_token = githubTokenInput.value;
  chrome.storage.sync.set({ oauth_token }, handleSuccess);
}

document.getElementById('save_token').addEventListener('click', saveToken);

chrome.storage.sync.get('oauth_token', ({ oauth_token }) => {
  if (!oauth_token) {
    return;
  }

  githubTokenInput.value = oauth_token;
});