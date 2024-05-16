import React, { useEffect } from "react"
import "~style.css"
import redmark from "data-base64:~../assets/redmark.png"
import check from "data-base64:~../assets/check.png"
import { sendToBackground } from "@plasmohq/messaging"



 function IndexPopup() {
   chrome.runtime.onMessage.addListener((message) => { 
      console.log("happen")
      console.log(message)
    })
  const isPhishing = true;
  return (
    <div className="p-8 text-center">
      <img
        src={isPhishing ? redmark : check}
        alt={isPhishing ? "Phishing" : "Safe"}
        className="inline-block w-16 h-16 mx-auto mb-4"
      />
      
      <div className={isPhishing ? "text-red-500 text-lg" : "text-green-500 text-lg"}>
        {isPhishing ? "This website is phishing." : "This website is safe."}
      </div>
    </div>
  );
}

export default IndexPopup;
