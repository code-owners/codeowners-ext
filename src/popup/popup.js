const isInGithubUrl = (url) => url && url.indexOf('github.com') > 0

const disable = () => {
  const input = document.getElementById('github_token');
  const button = document.getElementById('save_token');
  input.placeholder = 'You must be in github.com'
  input.disabled = true
  button.disabled = true
}

const handleFailure = () => {
  const span = document.getElementById('title_span')
  span.innerHTML = 'You must be in github.com';
  span.color = 'red'
}
const handleSuccess = () => window.close()


const sendTokenToContent = (token, cb) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    const activeTab = tabs[0];
    const isInGithub = activeTab && isInGithubUrl(activeTab.url) 
    isInGithub && chrome.tabs.sendMessage(activeTab.id, {codeowners: 'popup', token});
    cb(isInGithub)
   });
}

const saveToken = () => {
    var token = document.getElementById('github_token').value;
    sendTokenToContent(token, (success) => {
      success ? handleSuccess() : handleFailure()
    })
  }

  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    const activeTab = tabs[0];
    console.log('hitting current tab', activeTab)
    const isInGithub = activeTab && isInGithubUrl(activeTab.url) 
    if (!isInGithub) disable()
    else document.getElementById('save_token').addEventListener('click', saveToken);
   });
