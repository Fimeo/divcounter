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
        const nodeList = document.querySelectorAll('*')
        const HTMLNodeNames = new Set([...nodeList].map(i => i.nodeName))

        let payload = {}
        payload.all = nodeList.length;
        payload.mapNodeNames = [...HTMLNodeNames].map(function (i) {
            return {
                number: document.querySelectorAll(i).length,
                name: i.toLowerCase()
            }
        }).sort(function (a, b) {
            if (a.number > b.number) {
                return -1
            }
            if (a.number < b.number) {
                return 1;
            }
            return 0
        })
        return payload;
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
