
const sendTokenToContent = (token) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    activeTab && chrome.tabs.sendMessage(activeTab.id, {codeowners: 'popup', token});
   });
}

const saveToken = () => {
    var token = document.getElementById('github_token').value;

    
    chrome.runtime.sendMessage({codeowners: 'popup', token})
    localStorage.setItem('codeowners.accessToken', token)
    window.close();
  }
  document.getElementById('save_token').addEventListener('click', saveToken);