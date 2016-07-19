import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {DetailPage} from '../detail/detail'
import {Camera, File} from 'ionic-native';
import {FilterService} from '../../providers/filter-service/filter-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private _nav: NavController, private _filterService: FilterService, private _platform: Platform) {this._platform.resume.subscribe(e => console.log('BOOM'))}

  private takePicture() {
    Camera.getPicture({
    	quality: 100,      
		  targetWidth: 1000,
		  targetHeight: 1000,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,            
    })
  	.then(file_uri => this.cameraSuccess(file_uri), err => console.log(err));
  }

  private showGallery() {
  	Camera.getPicture({
    	destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    })
  	.then(file_uri => this.cameraSuccess(file_uri), err => console.log(err));
  }

  private cameraSuccess (file_uri) {    
    console.log(file_uri)
    let image = new Image();
		image.onload = ()=>{
			this._filterService.setImage(image);
      this._nav.push(DetailPage);
    }
    image.src=file_uri;
  }

}
