import loading from "data-base64:~../assets/loading.gif"
let star=null

const getStar = () => {
    return new Promise((resolve) => {
      let star = null;
      const intervalId = setInterval(() => {
        star = document.querySelector('.ii.gt');
        if (star !== null) {
          clearInterval(intervalId);
          resolve(star);
        }
      }, 1000);
    });
  };
  let rememberOldHtml=""
  getStar().then(async (star:any) => {
    let phishing=undefined
    rememberOldHtml=star.innerHTML
      let div=document.createElement("div")
      div.setAttribute("style","display:flex;align-items:center;width:100%;justify-content:center;height:300px")
      let img= document.createElement("img");
      img.src=loading
      img.style.width="200px"
      img.style.height="200px"
      img.style.marginLeft="15px"
      img.classList.add("phishing-img")
      star.innerHTML=""
      div.appendChild(img)
      
      star.appendChild(div)
      const response= await fetch("http://localhost:3000/email",{
              method: 'POST',
              body: JSON.stringify({ text:stripHtmlTags(rememberOldHtml) }),
              headers: { 'Content-Type': 'application/json' },
            })
      const data= await response.json();
      const  isPhishing=data["prediction"][0]=="Safe Email"?false:true
        if(isPhishing===true){
          div.innerHTML=""
          div.appendChild(invokeWarning())
        }else if(isPhishing===false){
          star.innerHTML=rememberOldHtml
        }
      


  })

function invokeWarning(){
  let int=`<div  class="warningDiv background fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-screen h-screen"

  style=' display:"flex";width:"100%";height:"100%";textAlign:"center";justifyContent:"center";background-color:"#eee"'
  >
    <div class="bg-white p-8 rounded-lg max-w-md text-center"  style='padding-top:"10vh"' >
      <h2 class="plasmo-text-2xl font-bold mb-4" style='color:"red"'>Warning</h2>
      <p class="mb-6" style='color:"black"'>This Email detected as  phishing.</p>
      <button  style='color:"red"' id="continueButton">
        Do you want to continue?
      </button>
    </div>
  </div>
  `
  
  let warningdiv=document.createElement("div")
  warningdiv.innerHTML=int
  
  const continueButton = warningdiv.querySelector("#continueButton");
  continueButton.addEventListener("click", () => {
    const warningDiv:any = document.querySelector(".warningDiv");
    star = document.querySelector('.ii.gt');
    warningDiv.style.display = "none";
    console.log(star,rememberOldHtml)
    star.innerHTML = rememberOldHtml;
  });
  return warningdiv
}

function stripHtmlTags(html) {
  return html.replace(/<[^>]*>?/g, '');
}
