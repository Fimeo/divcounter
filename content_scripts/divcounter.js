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

    function getHTMLElementsStats() {
        return {
            all: document.querySelectorAll('*').length,
            div: document.querySelectorAll('div').length
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "reload()".
     */
    browser.runtime.onMessage.addListener( request => {
        switch (request.command) {
            case 'stats':
                return Promise.resolve(getHTMLElementsStats())
            default:
                return Promise.reject()
        }
    })
})();
