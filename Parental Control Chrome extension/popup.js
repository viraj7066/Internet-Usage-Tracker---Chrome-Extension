document.addEventListener('DOMContentLoaded', () => {
    const usageList = document.getElementById('usageList');
    const loading = document.getElementById('loading');
  
    chrome.storage.local.get(['usageData'], (result) => {
      loading.style.display = 'none';
      const usageData = result.usageData || [];
  
      if (usageData.length === 0) {
        usageList.innerHTML = '<p>No data available.</p>';
        return;
      }
  
      // Sort data by the lastVisit timestamp in descending order
      usageData.sort((a, b) => b.lastVisit - a.lastVisit);
  
      usageData.forEach((site) => {
        const listItem = document.createElement('div');
        listItem.className = 'usage-item';
  
        const url = document.createElement('div');
        url.className = 'url';
        url.textContent = site.url;
  
        const timeSpent = document.createElement('div');
        timeSpent.className = 'timeSpent';
        timeSpent.textContent = `Visits: ${site.visits}, Time Spent: ${site.timeSpent} seconds`;
  
        listItem.appendChild(url);
        listItem.appendChild(timeSpent);
  
        usageList.appendChild(listItem);
      });
    });
  });
  