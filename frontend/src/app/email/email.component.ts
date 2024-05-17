import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  emailText: string = ''; 

  prediction: any;

  constructor(private http: HttpClient) {}
  onEmailTextChange(value: string) {
    this.emailText = value;
  }
  errorMessage: string = '';
  isPhishing: boolean | null = null;
  submitted: boolean = false;
  submitForm() {
    this.errorMessage = '';
    this.submitted = false;
    this.isPhishing = null;
    this.prediction = null;

    this.http.post<{ prediction: string[] }>('https://6237-196-70-252-214.ngrok-free.app/email', { text: this.emailText })
      .subscribe(
        response => {
          if (response.prediction[0] === 'Phishing Email') {
            this.isPhishing = true;
            this.prediction = 'Phishing Email';
          } else {
            this.isPhishing = false;
            this.prediction = 'Safe Email';
          }
          this.submitted = true;
        },
        error => {
          console.error('Error during API request:', error);
          this.errorMessage = 'An error occurred while checking the email.';
        }
      );
  }

  // OCR **********************************

  public extractedText: string = ''; 
  public imageUrl?: string;


  onUploadClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        this.uploadImage(formData);
      }
    });
    fileInput.click();
  }

  uploadImage(formData: FormData) {
    this.http.post<any>('http://localhost:5000/upload', formData).subscribe(
      (response) => {
        console.log('Texte extrait:', response.extracted_text);
        this.imageUrl = 'data:image/png;base64,' + response.image_base64;
        this.extractedText = response.extracted_text; 
        // console.log(this.extractedText);
      },
      (error) => {
        console.error('Échec du téléchargement:', error);
      }
    );
  }
}
