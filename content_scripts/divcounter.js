(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function reload() {
        console.log('reloaded')
    }

    /**
     * Listen for messages from the background script.
     * Call "reload()".
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "reload") {
            reload();
        }
    });

})();
