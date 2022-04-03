// -------------------
// --- Ticket Open ---
// -------------------

const PUXC_BASE = "https://angieslist.atlassian.net/browse/PUXC-"
let ticketForm = document.getElementById("ticket-form")

ticketForm.addEventListener("submit", async () => {
    let newURL = PUXC_BASE + document.getElementById("ticket-input").value;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.update(tab.id, { url: newURL })
})

// ---------------------
// --- Filter On/Off ---
// ---------------------

let filterSwitch = document.getElementById("filter-switch")

chrome.storage.sync.get("filter", (json) => {
    filterSwitch.checked = json.filter
});

filterSwitch.addEventListener("click", async () => {
    chrome.storage.sync.set({ 'filter': filterSwitch.checked });
})