import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  emailText: string = ''; // Initialize the property

  prediction: any;

  constructor(private http: HttpClient) {}

  submitForm() {
    const data = { text: this.emailText };
    this.http.post<any>('http://localhost:5000/email', data).subscribe(response => {
      this.prediction = response.prediction;
    });
  }
}
