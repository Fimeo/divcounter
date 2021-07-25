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
    }).then(response => {
        document.querySelector('#divs').innerHTML = response.div
        document.querySelector('#total').innerHTML = response.all
    }).catch(reportExecuteScriptError)
}

/**
 * Reload action : update stats
 */
document.addEventListener('click', e => {

    if (e.target.classList.contains('reload')) {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }).then(makeStats)
    }
})

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/divcounter.js"})
    .then()
    .catch(reportExecuteScriptError);

browser.tabs.query({
    active: true,
    currentWindow: true
}).then(makeStats)
