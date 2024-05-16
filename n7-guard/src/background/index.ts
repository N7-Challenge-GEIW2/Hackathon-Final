import { Storage } from "@plasmohq/storage"

export {}

const storage = new Storage()
 
console.log(
  "Live now; make now always the most precious time. Now will never come again."
)


// Replace with your backend API endpoint URL
// const phishingCheckUrl = 'https://your-backend-domain/api/check-phishing';



chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("letsgoo")
  if (changeInfo.status === 'complete' && tab.active) {
    const url = tab.url;
    if (url) {
      try {
        // const response = await fetch(phishingCheckUrl, {
        //   method: 'POST',
        //   body: JSON.stringify({ url }),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        if (true) {
        //   const data = await response.json();
          // Update the popup with phishing risk information (call a function)
          console.log('Tab loading updated:', url);
          updatePopup(true);
        } else {
        //   console.error('Error fetching phishing data:', response.statusText);
        }
      } catch (error) {
        console.error('Error checking URL:', error);
      }
    }
  }
});

async function updatePopup(isPhishing: boolean) {
    console.log("heooll")
    await storage.set("isPhishing", true)

 

  // Send a message to the popup.tsx with the phishing risk data
}