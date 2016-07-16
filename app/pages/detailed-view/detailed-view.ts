import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FilterService} from '../../providers/filter-service/filter-service';
import {FilterComponent} from '../../components/filter-component/filter-component';
import {File} from 'ionic-native';
/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detailed-view/detailed-view.html',
  directives: [FilterComponent]
})
export class DetailedViewPage {

	@ViewChild("photo") photo: ElementRef;
	canvas: any;
	ctx: CanvasRenderingContext2D;	
	filters: Array<string> = ['grayscale', 'sepia', 'warm', 'red'];
	image: any;

src:any;
  constructor(private _nav: NavController, private _navParams: NavParams, private _filterService: FilterService) {
  	
  }

  ngOnInit () {	
		this.image = this._filterService.getImage();  		
	}

  ngAfterViewInit() { // wait for the view to init before using the element
  	let canvas = this.photo.nativeElement;
  	
  	canvas.width = window.innerWidth;
  	canvas.height = (canvas.width / this.image.width) * this.image.height; //match canvas aspect ratio to original image
  	
  	let ctx = canvas.getContext("2d");    		
  	
  	this.drawImage(canvas, ctx);		
  }

  private drawImage (canvas, ctx) {
  
  		
  		ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
  												 0, 0, ctx.canvas.width, ctx.canvas.height);
  	
  		this._filterService.setOriginalCanvas(canvas);
  	
  	


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
