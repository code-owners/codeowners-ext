const handleSuccess = () => window.close()

  const saveToken = () => {
    var oauth_token = document.getElementById('github_token').value;
    chrome.storage.sync.set({oauth_token}, handleSuccess);
  }

  document.getElementById('save_token').addEventListener('click', saveToken);
