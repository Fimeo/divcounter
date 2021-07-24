/**
 * Listen for clicks on the buttons
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`[ERROR] Error catching : ${error}`);
        }

        /**
         * This function aim to reload counting
         */
        function reload(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reload"
            });
        }

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.classList.contains("reload")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(reload)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute divcounter content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/divcounter.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
