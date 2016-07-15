import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FilterService} from '../../providers/filter-service/filter-service';
import {FilterComponent} from '../../components/filter-component/filter-component'
import {File} from 'ionic-native';
/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detailed-view/detailed-view.html',
  providers: [FilterService, FilterComponent]
})
export class DetailedViewPage {

	@ViewChild("photo") photo: ElementRef;
	canvas: any;
	ctx: CanvasRenderingContext2D;	
	filters: Array<string> = ['grayscale', 'sepia'];

src:any;
  constructor(private _nav: NavController, private _navParams: NavParams, private _filterService: FilterService) {

  }

  ngAfterViewInit() { // wait for the view to init before using the element
  	
  	this.displayPhoto();
		
  }

  private displayPhoto () {
  	this.canvas = this.photo.nativeElement;
  	this.ctx = this.canvas.getContext("2d");    		
  	const image = new Image();

  	image.onload = () => {
 
  		let canvasWidth = window.innerWidth;
  		let canvasHeight = (canvasWidth / image.width) * image.height; //match canvas aspect ratio to original image
  	
  		this.ctx.canvas.width = canvasWidth;
  		this.ctx.canvas.height = canvasHeight;
  		
  		this.ctx.drawImage(image, 0, 0, image.width, image.height,
  												 0, 0, canvasWidth, canvasHeight);
  	
  		this._filterService.setOriginalCanvas(this.canvas)
  		this._filterService.setImage(image);
  	}

  	// image.src=this._navParams.get('file_uri');
  	image.src="./test.png"


  }

 
 //  private filterImage (filter, ...var_args) {
	//  	let imageData = this.photoCtx.getImageData(0, 0, this.photoCanvas.width, this.photoCanvas.height);
	//   let args = [imageData];
	  
	//   for (let i = 2; i < arguments.length; i++) {
	//     args.push(arguments[i]);
	//   }
	//   let imageDataFiltered = this._filterService[filter].apply(null, args);
	//   this.photoCtx.putImageData(imageDataFiltered, 0, 0);
	// }

	

}
