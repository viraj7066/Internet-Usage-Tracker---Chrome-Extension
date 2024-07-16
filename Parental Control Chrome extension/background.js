chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ usageData: [] });
  
    // Create an alarm to clear history every 10 hours
    chrome.alarms.create("clearHistory", { periodInMinutes: 600 });
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "clearHistory") {
      chrome.storage.local.set({ usageData: [] }, () => {
        console.log("Usage data cleared.");
      });
    }
  });
  