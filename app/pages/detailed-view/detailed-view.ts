import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CameraService} from '../../providers/camera-service/camera-service';

/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detailed-view/detailed-view.html',
  providers: [CameraService]
})
export class DetailedViewPage {

	@ViewChild("photo") photo: ElementRef;

  constructor(private _nav: NavController, private _cameraService: CameraService) {

  }

  ngAfterViewInit() { // wait for the view to init before using the element
    let ctx: CanvasRenderingContext2D = this.photo.nativeElement.getContext("2d");
    data =  this._cameraService.getImageBase64();
		ctx.drawImage(data, 0, 0);
  }

}
