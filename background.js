// background.js

const TABS_WARNING_LIMIT = 8

function checkIfGitlabAngi(url) {
    return url.match("https://gitlab.com/git/angi1/.*")
}

function checkIfGitHubAngi(url) {
    return url.match("https://github.com/angieslist/.*")
}

chrome.webNavigation.onBeforeNavigate.addListener(async (tab) => {
    if (checkIfGitlabAngi(tab.url)) {
        chrome.tabs.update(tab.id, { url: tab.url.replace("git/", "") });
    }
    else if (checkIfGitHubAngi(tab.url)) {
        chrome.tabs.update(tab.id, { url: tab.url.replace("github.com/", "gitlab.com/angi1/") });
    }
})

updateTabNumberBadge = async () => {
    let tabs = await chrome.tabs.query({ currentWindow: true });

    chrome.action.setBadgeText({ text: "" + tabs.length });
    if (tabs.length >= TABS_WARNING_LIMIT) {
        chrome.action.setBadgeBackgroundColor({ color: '#ff0000' })
    }
    else {
        chrome.action.setBadgeBackgroundColor({ color: '#4285F4' })
    }
}

chrome.tabs.onCreated.addListener(async (tab) => {
    updateTabNumberBadge()
})

chrome.tabs.onRemoved.addListener(async (tab) => {
    updateTabNumberBadge()
})
