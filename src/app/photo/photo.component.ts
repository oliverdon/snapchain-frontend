import { Component, Input } from '@angular/core';

import { Photo } from '../photo';


@Component({
  selector: 'snapchain-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})

export class PhotoComponent {
    @Input() photo: Photo;

}
