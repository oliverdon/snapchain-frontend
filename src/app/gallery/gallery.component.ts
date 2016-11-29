import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PhotoService} from '../photo.service';
import { Photo } from '../photo';


@Component({
  selector: 'snapchain-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})

export class GalleryComponent implements OnInit {
    photos: Photo[];
    live: boolean = false;
    hw: string = '';

    constructor(private ref: ChangeDetectorRef, private photoService: PhotoService) { }

    fetchPhotos(): void {
      this.photoService.getPhotos().then((photos: Photo[]) => {
          this.live = this.photoService.live;
          this.hw = this.photoService.hw;
          this.photos = photos;
          // zone does not currently correctly patch the core-es6 promise polyfill
          // when it is loaded by webpack, therefore we must manually trigger here
          this.ref.detectChanges();
      });
    }

    ngOnInit(): void {
      this.fetchPhotos();
    }

}
