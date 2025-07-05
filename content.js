
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeRegion') {
        changeRegionViaUrl(request.region);
        sendResponse({ success: true });
    } else if (request.action === 'getHtmlLang') {
        const lang = document.documentElement.lang || '';
        sendResponse({ lang });
    }
});

function changeRegionViaUrl(targetRegion) {
    try {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('gl', targetRegion);
        window.location.href = currentUrl.toString();
    } catch (error) {
        console.error('Error changing region via URL:', error);
    }
}

function updateBadgeFromPage() {
    try {
        const url = new URL(window.location.href);
        const gl = url.searchParams.get('gl') || '';
        const hl = url.searchParams.get('hl') || document.documentElement.lang || '';
        chrome.runtime.sendMessage({
            action: 'updateBadge',
            region: gl.toUpperCase(),
            language: hl,
            tabId: getTabId()
        });
    } catch (e) {}
}


function getTabId() { return undefined; }


updateBadgeFromPage();


window.addEventListener('popstate', updateBadgeFromPage);
window.addEventListener('pushstate', updateBadgeFromPage);
window.addEventListener('replacestate', updateBadgeFromPage);