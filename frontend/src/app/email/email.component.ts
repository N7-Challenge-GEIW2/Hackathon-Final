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

  submitForm() {
    const data = { text: this.emailText };
    this.http.post<any>('http://localhost:5000/email', data).subscribe(response => {
      this.prediction = response.prediction;
    });
  }


  // OCR 

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
