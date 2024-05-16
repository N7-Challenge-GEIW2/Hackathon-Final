import { Component } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
})
export class AudioComponent {
  audioUrl: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.audioUrl = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }
}