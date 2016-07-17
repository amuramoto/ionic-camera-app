import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailedViewPage} from '../detailed-view/detailed-view'
import {Camera, File} from 'ionic-native';
import {FilterService} from '../../providers/filter-service/filter-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  constructor(private _nav: NavController, private _filterService: FilterService) {

  }

  ionViewLoaded(){console.log('LOADED')}
  ngOnInit(){console.log('NGONINIT')}

  private takePicture(){    
    Camera.getPicture({
    	quality: 10,      
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
      this._nav.push(DetailedViewPage);
    }
    image.src=file_uri;
  }

}
