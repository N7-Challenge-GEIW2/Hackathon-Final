console.log("working");
import redfish from "data-base64:~../assets/icon-red.development.png"
import grayfish from "data-base64:~../assets/icon.development.png"
import loading from "data-base64:~../assets/loading.gif"

const getTable = () => {
  return new Promise((resolve) => {
    let table = null;
    const intervalId = setInterval(() => {
      table = document.querySelector(".Cp tbody");
      if (table !== null) {
        clearInterval(intervalId);
        resolve(table);
      }
    }, 1000);
  });
};
let  array:any[]=[]
getTable()
  .then(async (table:any) => {
    const trNodes = table.childNodes;
    trNodes.forEach((trNode:any,index:any) => {
        setInterval(async () => {
            createImg(trNode,index)
        }, 500);
    });
    let trNode=trNodes[28];
          const dataThreadIdNode = trNode.querySelector('[data-thread-id]').getAttribute('data-thread-id')
            let RC=dataThreadIdNode.replace("#","")
            let result=await emailBody(RC)
            result=JSON.parse(result)
            let body=result[1][0][2][0][1][5][1][0][2][1]
            body=stripHtmlTags(body)
            //fetch
            array[0]=true
            array[1]=false

  })
  .catch((error) => {
    console.error("Error:", error);
  });


const  emailBody = async (dataThreadIdNode)=>{

  const data= await fetch("https://mail.google.com/sync/u/0/i/fd?hl=en&c=0&rt=r&pt=ji", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,fr;q=0.7,fr-FR;q=0.6,ar;q=0.5,fr-CA;q=0.4",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"124\", \"Not-A.Brand\";v=\"99\", \"Google Chrome\";v=\"124\"",
    "sec-ch-ua-arch": "\"x86\"",
    "sec-ch-ua-bitness": "\"64\"",
    "sec-ch-ua-full-version": "\"124.0.6367.207\"",
    "sec-ch-ua-full-version-list": "\"Chromium\";v=\"124.0.6367.207\", \"Not-A.Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"124.0.6367.207\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"14.0.0\"",
    "sec-ch-ua-wow64": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-framework-xsrf-token": "AKwhgQrJOCYaHrdpt0E-xhah_axsBuJCUw:1715888198888",
    "x-gmail-btai": "[null,null,[null,null,null,null,null,0,null,null,null,1,null,null,1,null,0,1,1,0,1,null,null,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,\"en\",\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36\",1,0,25,null,0,1,0,1,1,1,1,1,null,1,1,0,1,1,0,0,null,0,1,null,1,0,null,null,0,null,1,1,1,1,null,0,0,0,null,null,1,100,1,1,0,1,0,0,0,1,0,0,1,null,null,0,0,0],null,\"e806daef21\",null,25,\"gmail.pinto-server_20240502.06_p0\",1,5,\"\",3600000,\"+01:00\",null,null,630101560,\"\",\"\",1715888216713]",
    "x-gmail-storage-request": "",
    "x-google-btd": "1"
  },
  "referrer": "https://mail.google.com/mail/u/0/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "[[[\""+dataThreadIdNode+"\",1,null,null,1]],1]",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
let result1=null
result1=await readStream(data.body)
return result1
}


async function readStream(stream) {
    const reader = stream.getReader();
    let result = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result += new TextDecoder("utf-8").decode(value, { stream: true });
        }
    } catch (error) {
        console.error('Error reading stream', error);
    } finally {
        reader.releaseLock();
    }

    return result;
}

// Example usage:




function stripHtmlTags(html) {
    return html.replace(/<[^>]*>?/g, '');
  }
  


function createImg(trNode:any,index:any){
    //verify if the  picture  exist 

    trNode.querySelectorAll('img');
    let src=loading
    if(array[index]===true){
        src=redfish
    }
    else if(array[index]===false){
        src=grayfish
    }
    if(trNode.querySelector('img.phishing-img')!==null){
        let img=trNode.querySelector('img.phishing-img');
        img.src=src
        return;
    };
    

    let img= document.createElement("img");
    img.src=src
    img.style.width="20px"
    img.style.height="20px"
    img.style.marginInline="15px"
    img.classList.add("phishing-img")
    let tdElements = trNode.querySelectorAll('td');
   trNode.insertBefore(img, tdElements[3]);
}
