import { Component } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
})
export class AudioComponent {
  audioUrl: string | null = null;
  prediction: any;

  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    const subscriptionKey = 'da735a70c8794ae5bba8c4c38d3af014';
    const serviceRegion = 'eastus';

    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.audioUrl = fileReader.result as string;
        const audioFile = this.convertBase64ToFile(this.audioUrl, file.name);
        const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        recognizer.recognizeOnceAsync(result => {
       
          let elem=document.getElementById('result')||{innerText:""}
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            console.log(`Recognized: ${result.text}`);
            const data = { text: result.text };
            this.http.post<any>('https://6237-196-70-252-214.ngrok-free.app/email', data).subscribe(response => {
              this.prediction = response.prediction;
            });
            elem.innerText = `Recognized: ${result.text}`;
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
      };
      fileReader.readAsDataURL(file);
    }
  }

  private convertBase64ToFile(base64: string, filename: string): File {
    
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
}
