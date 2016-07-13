import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CameraService} from '../../providers/camera-service/camera-service';
import {File} from 'ionic-native';
/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detailed-view/detailed-view.html'
})
export class DetailedViewPage {

	@ViewChild("photo") photo: ElementRef;
	

src:any;
  constructor(private _nav: NavController, private _params: NavParams, private _cameraService: CameraService) {

  }

  ngAfterViewInit() { // wait for the view to init before using the element
  	
  	this.displayPhoto();
		
  }

  private displayPhoto () {
  	let ctx: CanvasRenderingContext2D = this.photo.nativeElement.getContext("2d");    		
  	const image = new Image();

  	image.onload = function () {
  	
  		let canvasWidth = window.innerWidth;
  		let canvasHeight = (canvasWidth / image.width) * image.height; //match canvas aspect ratio to original image
  	
  		ctx.canvas.width = canvasWidth;
  		ctx.canvas.height = canvasHeight;
  		
  		ctx.drawImage(image, 0, 0, image.width, image.height,
  												 0, 0, canvasWidth, canvasHeight);
  	
  	}

  	image.src=this._params.get('data');
  }

}
