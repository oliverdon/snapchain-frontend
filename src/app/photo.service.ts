import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Photo } from './photo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhotoService {
    live: boolean;
    hw: string;

    constructor(private http: Http) {
      this.login();
    }

    login(): Promise<boolean> {
      return this.http
                  .get('api/login')
                  .toPromise()
                  .then(() => true)
                  .catch(() => alert('Could not login'));
    }

    getPhotos(): Promise<Photo[]> {
      return this.http
                 .get(`api/photos`)
                 .toPromise()
                 .then(r => {
                     this.live = r.json().user.live;
                     this.hw = r.json().user.hw;
                     return r.json().photos as Photo[];
                 })
                 .catch(error => console.log(error) && false);
    }

    sendPhoto(img: string): Promise<boolean> {
      let formData = new FormData();
      formData.append('img', img);
      return this.http
                  .post(`api/photo`, formData)
                  .toPromise()
                  .then(r => true)
                  .catch(error => console.log(error) && false);
    }
}
