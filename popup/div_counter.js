/**
 * Content_script
 * Executed once when extension button shows popup
 */

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute divcounter content script: ${error.message}`);
}

function makeStats(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
        command: 'stats'
    }).then(payload => {
        showReport(payload)
    })
}

function showReport(payload) {
    document.querySelector('#total').innerHTML = payload.all
    let table = document.querySelector('#table')
    table.innerHTML = ''
    for (let node of payload.mapNodeNames) {
        table.appendChild(createStatItem(node.name, node.number))
    }
}

function createStatItem(name, number) {
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdValue = document.createElement('td')
    tdName.innerText = name
    tdValue.innerText = number
    tr.appendChild(tdName)
    tr.appendChild(tdValue)
    return tr
}

/**
 * Reload action : update stats
 */
document.querySelector('#reload').addEventListener('click', e => {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then(makeStats)
})

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/divcounter.js"})
    .then(() => {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }).then(makeStats)
    })
