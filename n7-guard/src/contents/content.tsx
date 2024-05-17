import React, { useEffect, useState } from "react";
import "~style.css"
import { persistor, store } from "~store"

let isPhishing = false;

const CustomButton = () => {
    let [displayWarning,setDisplayWarning]=useState(false)
    //watch if it's phishing
    persistor.subscribe(() => {
      const state = store.getState()
      isPhishing=state.counter.isPhishing && state.counter.url.split("#")[0]==window.location.href.split("#")[0]
      console.log("is counter",state.counter)
      console.log("is phishing",isPhishing)
      console.log("is url",state.counter.url.split("#")[0]==window.location.href.split("#")[0])
      console.log("is w",window.location.href.split("#")[0])
      console.log("is s",state.counter.isPhishing)
      setDisplayWarning(isPhishing)
  
    })
  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 background "
    
    style={{ display:displayWarning?"flex":"none",width:"100vw",height:"100vh",textAlign:"center",justifyContent:"center",backgroundColor:"#eee" }}
    >
      <div className="max-w-md p-8 text-center bg-white rounded-lg" style={{paddingTop:"10vh"}} >
        <h2 className="mb-4 font-bold plasmo-text-2xl" style={{color:"red"}}>Warning</h2>
        <p className="mb-6" style={{color:"black"}}>This website is bad for you.</p>
        <button  style={{color:"red"}} onClick={()=>{console.log("work");setDisplayWarning(false)}}>
          Do you want to continue?
        </button>
      </div>
    </div>

  );
};

export default CustomButton;