
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated:', details.reason);
    
    if (details.reason === 'install') {
        
        chrome.storage.sync.set({
            autoApply: false,
            preferredRegion: 'US',
            showWelcome: true
        });
        console.log('Default settings applied');
    }
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && isGoogleUrl(tab.url)) {
        console.log('Google page loaded, checking auto-apply settings');
        
        try {
            const settings = await chrome.storage.sync.get(['autoApply', 'preferredRegion']);
            
            if (settings.autoApply && settings.preferredRegion) {
                console.log('Auto-applying region:', settings.preferredRegion);
                
                
                setTimeout(async () => {
                    try {
                        await chrome.tabs.sendMessage(tabId, {
                            action: 'changeRegion',
                            region: settings.preferredRegion
                        });
                        console.log('Auto-apply successful');
                    } catch (error) {
                        console.log('Auto-apply failed, content script not ready:', error);
                    }
                }, 2000);
            }
        } catch (error) {
            console.error('Error in auto-apply:', error);
        }
    }
    if (
        changeInfo.status === 'complete' &&
        pendingRegionChange[tabId] &&
        tab.url && tab.url.includes('/preferences')
    ) {
        const region = pendingRegionChange[tabId];
        delete pendingRegionChange[tabId];
        try {
            await chrome.tabs.sendMessage(tabId, {
                action: 'changeRegion',
                region
            });
            chrome.notifications?.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'Google Region Switcher',
                message: `Region set to ${region} in Google Search settings.`
            });
        } catch (error) {
            console.error('Failed to apply region on settings page:', error);
        }
    }
});


chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.preferredRegion) {
        console.log('Preferred region changed to:', changes.preferredRegion.newValue);
        updateBadge(changes.preferredRegion.newValue);
    }
});


let pendingRegionChange = {};
let tabBadgeInfo = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBadge') {
        
        const tabId = (sender && sender.tab && sender.tab.id) || request.tabId;
        if (tabId && request.region) {
            chrome.action.setBadgeText({ text: request.region, tabId });
            chrome.action.setBadgeBackgroundColor({ color: '#4285f4', tabId });
            
            tabBadgeInfo[tabId] = { region: request.region, language: request.language };
        }
        sendResponse && sendResponse({ success: true });
    }
    if (request.action === 'applyRegionOnSettingsPage') {
        pendingRegionChange[request.tabId] = request.region;
        sendResponse({ success: true });
    }
    if (request.action === 'getTabBadgeInfo') {
        const tabId = request.tabId;
        sendResponse(tabBadgeInfo[tabId] || {});
    }
});

function updateBadge(region) {
    if (region) {
        chrome.action.setBadgeText({ text: region });
        chrome.action.setBadgeBackgroundColor({ color: '#4285f4' });
    }
}

function isGoogleUrl(url) {
    if (!url) return false;
    
    return url.includes('google.com') || 
           url.includes('google.co.uk') ||
           url.includes('google.ca') ||
           url.includes('google.com.au') ||
           url.includes('google.de') ||
           url.includes('google.fr') ||
           url.includes('google.it') ||
           url.includes('google.es') ||
           url.includes('google.co.jp') ||
           url.includes('google.co.kr') ||
           url.includes('google.com.br') ||
           url.includes('google.co.in') ||
           url.includes('google.com.mx') ||
           url.includes('google.ru') ||
           url.includes('google.nl');
}

console.log('Background script loaded successfully');