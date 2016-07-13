import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailedViewPage} from '../detailed-view/detailed-view'
import {Camera} from 'ionic-native';
import {CameraService} from '../../providers/camera-service/camera-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CameraService]
})
export class HomePage {
  
  public base64Image: string;
  
  constructor(private _nav: NavController, private _cameraService: CameraService) {

  }
  
  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this._cameraService.setImageBase64("data:image/jpeg;base64," + imageData);
      this._nav.push(DetailedViewPage);
    }, (err) => {
      console.log(err);
    });
  }

}
