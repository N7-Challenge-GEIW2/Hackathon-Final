import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent {
  urlInput: string = '';
  result: any;

  constructor(private http: HttpClient) { }

  checkUrl() {
    const url = 'https://f6cb-196-70-252-214.ngrok-free.app/url'; // Ensure this URL matches your Flask API URL

    const data = {
      text: this.urlInput
    };

    this.http.post<any>(url, data)
      .subscribe(
        response => {
          this.result = response;
        },
        error => {
          console.error('Error during API request:', error);
        }
      );
  }
}
