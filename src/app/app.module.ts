import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';

import { WelcomeComponent } from './welcome/welcome.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotoComponent } from './photo/photo.component';
import { SnapComponent } from './snap/snap.component';
import { AppComponent } from './app.component';

import { PhotoService } from './photo.service';

import 'style-loader!./global.css';
import 'style-loader!./vital.min.css';

import 'file-loader!../fonts/icons.eot';
import 'file-loader!../fonts/icons.svg';
import 'file-loader!../fonts/icons.woff';
import 'file-loader!../fonts/icons.ttf';

const appRoutes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'snap', component: SnapComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'gallery', component: GalleryComponent}
];


@NgModule ({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],
    declarations: [AppComponent, SnapComponent, WelcomeComponent, PhotoComponent, GalleryComponent,],
    providers: [PhotoService],
    bootstrap: [AppComponent]
})


export class AppModule {}
