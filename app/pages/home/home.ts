import {Component} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';
import {DetailPage} from '../detail/detail'
import {Camera, CameraPreview} from 'ionic-native';
import {FilterService} from '../../providers/filter-service/filter-service';
import {CameraPage} from '../camera/camera';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  
  private options: any;
  private loading: Loading;

  constructor(private _nav: NavController, private _filterService: FilterService) {

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





private startCamera () {
  this._nav.push(CameraPage); 
}






  private getPicture (source: string): void {

    this.loading = Loading.create({cssClass: 'cameraLoading'});

    Camera.getPicture(this.options[source])
      .then(file_uri => this.cameraSuccess(file_uri), err => console.log(err));   
    
    //delay so the loading icon doesn't appear before transition to camera/gallery
    setTimeout(() => {this._nav.present(this.loading)}, 500); 
  }

  private cameraSuccess (file_uri: string): void {        
   
    let image = new Image();
		image.onload = ()=>{
			this._filterService.setImage(image);      
      this._nav.push(DetailPage);
      this.loading.dismiss();
    }
    image.src=file_uri;
  }

}
