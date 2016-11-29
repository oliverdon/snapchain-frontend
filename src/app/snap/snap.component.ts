import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService} from '../photo.service';

// import { SnapService } from './snap.service';


enum SnapState {
    INIT,
    RECORDING,
    CAPTURED,
    SENDING,
    MEDIA_ERROR,
    UNEXPECTED_STATE
}

@Component({
  selector: 'snapchain-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.css']//,
  // providers: [SnapService]
})

export class SnapComponent {
    @ViewChild('snapVideo') snapVideo: ElementRef;
    @ViewChild('snapCanvas') snapCanvas: ElementRef;

    // So the template can see it
    private SnapState = SnapState;

    private videoWidth: number = 640;
    private videoHeight: number = 0;
    private photoSrc: string;
    private snapState: SnapState;

    // we need to inject change detector so we can manually fire after getusermedia
    constructor(private ref: ChangeDetectorRef, private photoService: PhotoService, private router: Router) {
        this.snapState = SnapState.INIT;
    }

    ngAfterViewInit() {
        // success callback
        let mediaSuccessStream = (stream: any) => {
            if ((<any>navigator).mozGetUserMedia) {
                this.snapVideo.nativeElement.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || (<any>window).webkitURL;
                this.snapVideo.nativeElement.src = vendorURL.createObjectURL(stream);
            }
            this.snapVideo.nativeElement.play();
            // zone doesn't hook getusermedia so we have to manually fire
            this.stateChange(SnapState.RECORDING);
            this.ref.detectChanges();
        };

        // error callback
        let mediaErrorStream = (err: string) => {
            console.log('Error calling getUserMedia', err);
            // zone doesn't hook getusermedia so we have to manually fire
            this.stateChange(SnapState.MEDIA_ERROR);
            this.ref.detectChanges();
        };

        // browser neutral shim - types are a bit of a mess for this
        // todo define navigator interface?
        (<any>navigator).getMedia = ( (<any>navigator).getUserMedia ||
            (<any>navigator).webkitGetUserMedia ||
            (<any>navigator).mozGetUserMedia ||
            (<any>navigator).msGetUserMedia);

        (<any>navigator).getMedia({video: true, audio: false}, mediaSuccessStream, mediaErrorStream);
    }

    private stateChange (newState: SnapState): SnapState {
        if (newState === SnapState.RECORDING) {
            this.setVideoHeight();
        } else if (newState === SnapState.MEDIA_ERROR) {
            this.handleMediaError();
        } else if (newState === SnapState.CAPTURED) {
            this.capturePhoto();
        } else if (newState === SnapState.SENDING) {
            this.sendPhoto();
        }
        console.log('[State]', SnapState[newState]);

        this.snapState = newState;
        // zone does not currently correctly patch the promise polyfill
        this.ref.detectChanges();
        return newState;
    }

    private setVideoHeight() {
        this.videoHeight = this.snapVideo.nativeElement.videoHeight / (this.snapVideo.nativeElement.videoWidth / this.videoWidth);
        if (isNaN(this.videoHeight)) {
            this.videoHeight = this.videoWidth / (4/3);
        }
    }

    private handleMediaError() {
        alert('Could not get access to camera, you either have not camera or you refused permission');
    }

    private capturePhoto() {
        let video = this.snapVideo.nativeElement;
        let canvas = this.snapCanvas.nativeElement;
        canvas.width = this.videoWidth;
        canvas.height = this.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, this.videoWidth, this.videoHeight);
        this.photoSrc = canvas.toDataURL('image/jpeg', 0.7);
    }

    private sendPhoto() {
        this.photoService.sendPhoto(this.photoSrc).then((ok) => {
            console.log('sent ok');
            this.router.navigate(['/gallery']);
        });;
    }
}
