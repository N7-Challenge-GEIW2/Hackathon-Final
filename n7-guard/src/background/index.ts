import { setisPhishingFalse, setisPhishingTrue } from "../phishing-slice"
import { persistor, store } from "~store"
import iconphishing from 'url:../../assets/icon-red.development.png';
import type { text } from "stream/consumers";
import { url } from "inspector";

export {}

 
console.log(
  "Live now; make now always the most precious time. Now will never come again."
)


// Replace with your backend API endpoint URL
// const phishingCheckUrl = 'https://your-backend-domain/api/check-phishing';


let phishingCheckUrl="https://f6cb-196-70-252-214.ngrok-free.app/url"
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("letsgoo")
  if (changeInfo.status === 'complete' && tab.active) {
    const url = tab.url;
    if (url.indexOf('www.google') < 0 && url.indexOf('mail.google') < 0 && url.indexOf('localhost') < 0){
      try {
        console.log('Tab loading updated:', url);
        const response = await fetch(phishingCheckUrl, {
          method: 'POST',
          body: JSON.stringify({ text:url }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        const isPhishing = data.prediction === 'phishing' || data.prediction === 'malicious';
        console.log("is phishing",isPhishing)

        updatePopup(isPhishing,tabId,url);
          await fetch("https://92bd-196-70-252-214.ngrok-free.app/url/add",{
              method: 'POST',
              body: JSON.stringify({ url:url,status:isPhishing?"Phishing":"Not Phishing" }),
              headers: { 'Content-Type': 'application/json' },
            })
      } catch (error) {
        console.error('Error checking URL:', error);
      }
    }else{
      updatePopup(false,tabId,url);

    }
  }
});

chrome.webRequest.onCompleted.addListener(
  async (details) => {
      try {
        // const isSpam = await checkResponseForSpam(details);
        // console.log("error analyse",details.url)
        if(details.url=="https://mail.google.com/sync/u/0/i/fd?hl=en&c=0&rt=r&pt=ji"){
          console.log(details)
        }
        // if (isSpam) {
        //   // updateIconAndPopup(true, details.tabId);
        //   chrome.tabs.sendMessage(details.tabId, { action: 'showWarning' });
        // }
      } catch (error) {
        console.error('Error analyzing response:', error);
      }
    },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

async function updatePopup(isPhishing: boolean,tabId:number,url:string) {
  if(isPhishing){
    
    store.dispatch(setisPhishingTrue({url}))
    chrome.action.setBadgeText({ text: "WARN", tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#FF0000", tabId: tabId });
    console.log("iconphishing",iconphishing)
    // chrome.action.setIcon({ path: iconphishing, tabId: tabId });

  }else{
    store.dispatch(setisPhishingFalse())
    chrome.action.setBadgeText({ text: "GD", tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#00FF00", tabId: tabId });
    // chrome.action.setIcon({ path: "", tabId: tabId });

  }
  // Send a message to the popup.tsx with the phishing risk data
}







