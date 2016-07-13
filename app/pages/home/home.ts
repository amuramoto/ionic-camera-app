import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailedViewPage} from '../detailed-view/detailed-view'
import {Camera, File} from 'ionic-native';
import {CameraService} from '../../providers/camera-service/camera-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
test:string;  
  public base64Image: string;
  @ViewChild("photo") photo: ElementRef;
  constructor(private _nav: NavController, private _cameraService: CameraService) {

  }

  takePicture(){    
    Camera.getPicture({
    	quality: 20,      
		  targetWidth: 1000,
		  targetHeight: 1000,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,      
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
      })
    	.then((file) => {    	
	      this._nav.push(DetailedViewPage, {data: "data:image/jpeg;base64," + file});
	    }, (err) => {
	      console.log(err);
	    });
  }

}
