import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CameraService} from '../../providers/camera-service/camera-service';
import {FilterService} from '../../providers/filter-service/filter-service';
import {File} from 'ionic-native';
/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detailed-view/detailed-view.html',
  providers: [FilterService]
})
export class DetailedViewPage {

	@ViewChild("photo") photo: ElementRef;
	photoCtx: CanvasRenderingContext2D;
	photoCanvas: any;
src:any;
  constructor(private _nav: NavController, private _params: NavParams, private _cameraService: CameraService, private _filterService: FilterService) {

  }

  ngAfterViewInit() { // wait for the view to init before using the element
  	
  	this.displayPhoto();
		
  }

  private displayPhoto () {
  	this.photoCanvas = this.photo.nativeElement;
  	this.photoCtx = this.photoCanvas.getContext("2d");    		
  	const image = new Image();

  	image.onload = () => {
 
  		let canvasWidth = window.innerWidth;
  		let canvasHeight = (canvasWidth / image.width) * image.height; //match canvas aspect ratio to original image
  	
  		this.photoCtx.canvas.width = canvasWidth;
  		this.photoCtx.canvas.height = canvasHeight;
  		
  		this.photoCtx.drawImage(image, 0, 0, image.width, image.height,
  												 0, 0, canvasWidth, canvasHeight);
  	
  	}

  	image.src=this._params.get('file_uri');
  }

 
  private filterImage (filter, ...var_args) {
	 	let imageData = this.photoCtx.getImageData(0, 0, this.photoCanvas.width, this.photoCanvas.height);
	  let args = [imageData];
	  
	  for (let i = 2; i < arguments.length; i++) {
	    args.push(arguments[i]);
	  }
	  let imageDataFiltered = this._filterService[filter].apply(null, args);
	  this.photoCtx.putImageData(imageDataFiltered, 0, 0);
	}

	

}
