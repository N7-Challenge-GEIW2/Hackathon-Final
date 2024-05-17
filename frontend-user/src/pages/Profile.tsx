import DefaultLayout from '../layout/DefaultLayout';
import { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import axios from 'axios';
import Loader from '../common/Loader';
const Profile = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isPhishing, setIsPhishing] = useState(false); // Assume it's not phishing initially
  const [audioUrl, setAudioUrl] = useState<any>(''); // Assume it's not phishing initially7
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event:any) => {
    event.preventDefault(); // Prevent the form from submitting normally
    // Here you would check if the URL is phishing
    // For now, let's assume it's not phishing if any value is entered
    const file = event.target.files[0];
    console.log(event.target.files)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      let audioUrl1 = fileReader.result as string;
      setAudioUrl(audioUrl1);
    }
    fileReader.readAsDataURL(file);



    setIsPhishing(true); // Change to false if you want to simulate a phishing URL
    setSubmitted(true);
  };

  const onFileSelected =async (event: any) => {
    const file = event.target.files[0];
    console.log(event.target.files)
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      let audioUrl1 = fileReader.result as string;
      setAudioUrl(audioUrl1);
      setIsLoading(true);
      const subscriptionKey = '837adc1427124321a011acc5517cfe4b';
      const serviceRegion = 'eastus';
       const audioFile = convertBase64ToFile(audioUrl1, file.name);
        const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        recognizer.recognizeOnceAsync(result => {
          let elem=document.getElementById('result')||{innerText:""}
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            console.log(`Recognized: ${result.text}`);
            elem.innerText = `Recognized: ${result.text}`;
            setIsLoading(false);
             axios.post('https://6237-196-70-252-214.ngrok-free.app/email', { text: result.text }).then(response => {
                if (response.data.prediction === 'malicious') {
                  setIsPhishing(true);
                } else {
                  setIsPhishing(false);
                }
                setIsLoading(false);
                setSubmitted(true);

             });
          } else if (result.reason === sdk.ResultReason.NoMatch) {
            console.log('No speech could be recognized.');
            elem.innerText = 'No speech could be recognized.';
          } else if (result.reason === sdk.ResultReason.Canceled) {
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`Canceled: ${cancellation.reason}`);
            elem.innerText = `Canceled: ${cancellation.reason}`;
            if (cancellation.reason === sdk.CancellationReason.Error) {
              console.log(`Error details: ${cancellation.errorDetails}`);
              elem.innerText += ` Error details: ${cancellation.errorDetails}`;
            }
          }
        });
    }
    fileReader.readAsDataURL(file);
  }
  function convertBase64ToFile(base64: string, filename: string): File {
    
    const arr = base64.split(',');
    console.log("hollllaaa")
    const mime = (arr[0].match(/:(.*?);/)||'audio/mp3')[1];
    console.log(mime)
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    console.log("issue here")
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

  return new File([u8arr], filename, { type: mime });

}

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Vocals Check Form
              </h3>
            </div>
         
              <div className="p-6.5" style={{gap:"5px",flexDirection:"column",display:"flex"}}>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Vocal
                  </label>
                  <input
                    type="file"
                    id="audioFile"
                    onChange={onFileSelected}
                    placeholder="Enter an Url"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* {audioUrl} */}
                { audioUrl && <audio controls src={audioUrl}></audio>}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
                {submitted && (
                  <div className="text-center mt-3">
                    {isPhishing ? (
                      <div className="mt-4 flex items-center justify-center text-red-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Phishing Vocal
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center justify-center text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Not Phishing Vocal
                      </div>
                    )}
                  </div>
                )}
                 <p id="result" className="text-black" style={{marginTop: "30px"}}>
            </p>
            {  isLoading &&  <Loader/>}
              </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
