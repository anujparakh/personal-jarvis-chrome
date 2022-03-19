// background.js

function checkIfGitlab(url)
{
    return url.match("https://gitlab.com/git/angi1/.*")
}

chrome.webNavigation.onBeforeNavigate.addListener(async (tab) => {
    if(checkIfGitlab(tab.url))
    {
        chrome.tabs.update(tab.id, {url: tab.url.replace("git/", "") });
    }
})
