import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailedViewPage} from '../detailed-view/detailed-view'
import {Camera, File} from 'ionic-native';
import {FilterService} from '../../providers/filter-service/filter-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
test:string;  
  public base64Image: string;
  @ViewChild("photo") photo: ElementRef;
  constructor(private _nav: NavController, private _filterService: FilterService) {

  }

  private takePicture(){    
    Camera.getPicture({
    	quality: 20,      
		  targetWidth: 1000,
		  targetHeight: 1000,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,      
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    })
  	.then((file_uri) => {    	
  		this._filterService.setImage(file_uri);
      this._nav.push(DetailedViewPage);
    }, (err) => {
      console.log(err);
    });
  }

  private showGallery() {
  	Camera.getPicture({
    	destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,      
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    })
  	.then((file_uri) => {    	
  		this._filterService.setImage(file_uri);
  		this._nav.push(DetailedViewPage);      
    }, (err) => {
      console.log(err);
    });
  }



}
