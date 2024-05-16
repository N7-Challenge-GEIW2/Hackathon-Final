import React from "react"
import "~style.css"
import redmark from "data-base64:~../assets/redmark.png"
import check from "data-base64:~../assets/check.png"



function IndexPopup() {
  const isPhishing = true;
  return (
    <div className="w-64 p-8 text-center">
      <img
        src={isPhishing ? redmark : check}
        alt={isPhishing ? "Phishing" : "Safe"}
        className="inline-block w-16 h-16 mx-auto mb-4"
      />
      
      <div className={isPhishing ? "text-lg font-bold" : "text-lg font-bold"}>
        {isPhishing ? "This website is phishing." : "This website is safe."}
      </div>

      <button className="px-2 py-1 mt-4 font-bold text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
        Dashboard
      </button>
    </div>
  );
}

export default IndexPopup;
