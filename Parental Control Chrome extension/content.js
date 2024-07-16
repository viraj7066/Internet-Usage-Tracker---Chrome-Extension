let currentTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (currentTabId !== null) {
    // Save time spent on the previous tab
    saveTimeSpent(currentTabId);
  }

  // Update current tab ID and start time
  currentTabId = activeInfo.tabId;
  startTime = Date.now();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === currentTabId) {
    // Save time spent when the tab is closed
    saveTimeSpent(currentTabId);
    currentTabId = null;
  }
});

function saveTimeSpent(tabId) {
  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - startTime) / 1000); // Time spent in seconds

  chrome.tabs.get(tabId, (tab) => {
    const url = tab.url;

    chrome.storage.local.get(['usageData'], (result) => {
      let usageData = result.usageData || [];
      const siteIndex = usageData.findIndex((site) => site.url === url);

      if (siteIndex >= 0) {
        usageData[siteIndex].visits += 1;
        usageData[siteIndex].timeSpent += timeSpent;
        usageData[siteIndex].lastVisit = endTime;
      } else {
        usageData.push({
          url: url,
          visits: 1,
          timeSpent: timeSpent,
          lastVisit: endTime
        });
      }

      chrome.storage.local.set({ usageData: usageData });
    });
  });
}
