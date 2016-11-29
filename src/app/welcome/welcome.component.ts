import { Component } from '@angular/core';
import { PhotoService} from '../photo.service';

@Component({
  selector: 'snapchain-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent { 
    constructor(private photoService: PhotoService) { }
}
