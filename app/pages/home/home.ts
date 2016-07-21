import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform, Loading} from 'ionic-angular';
import {DetailPage} from '../detail/detail'
import {Camera} from 'ionic-native';
import {FilterService} from '../../providers/filter-service/filter-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  
  private options: any;
  private loading: Loading;

  constructor(private _nav: NavController, private _filterService: FilterService, private _platform: Platform) {

    this.options = {
      camera: {
        quality: 100,      
        targetWidth: 1000,
        targetHeight: 1000,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,            
      },
      gallery: {
        quality: 100,      
        targetWidth: 1000,
        targetHeight: 1000,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,      
        correctOrientation: true
      }
    }

  }

  private getPicture (source: string) {

    this.loading = Loading.create({spinner: 'bubbles'});

    Camera.getPicture(this.options[source])
      .then(file_uri => this.cameraSuccess(file_uri), err => console.log(err));   
    
    //delay so the loading icon doesn't appear before transition to camera/gallery
    setTimeout(() => {this._nav.present(this.loading)}, 500); 
  }

  private cameraSuccess (file_uri) {        
   
    let image = new Image();
		image.onload = ()=>{
			this._filterService.setImage(image);      
      this._nav.push(DetailPage);
      this.loading.dismiss();
    }
    image.src=file_uri;
  }

}
