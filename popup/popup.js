let ticketForm = document.getElementById("ticket-form")
const PUXC_BASE = "https://angieslist.atlassian.net/browse/PUXC-"

ticketForm.addEventListener("submit", async () => {
    let newURL = PUXC_BASE + document.getElementById("ticket-input").value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.update(tab.id, {url: newURL})
})

