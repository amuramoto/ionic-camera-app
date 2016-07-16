import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { FilterService } from '../../providers/filter-service/filter-service';
/*
  Generated class for the FilterComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'filter',
  templateUrl: 'build/components/filter-component/filter-component.html'
})
export class FilterComponent {

	@ViewChild("canvas") canvasElement: ElementRef;
	
	@Input () filterName: string;

	private imageData: ImageData;
	private image: any;
	private canvas: any;
	private ctx: CanvasRenderingContext2D;	

  constructor(private _filterService: FilterService) {    

    

    // this.originalCanvas = _filterService.getCanvasClone();
    // this.originalCtx = this.originalCanvas.getContext("2d")
    // this.originalCanvasWidth = this.originalCtx.canvas.width;
    // this.originalCanvasHeight = this.originalCtx.canvas.height;
    // this.imageData = this.originalCtx.getImageData(0, 0, this.originalCanvasWidth, this.originalCanvasHeight);

    
  };

	ngOnInit(){
    let canvas = this.canvasElement.nativeElement;		
    
    let imageData = this._filterService.getFilteredImageData(this.filterName);
    
    // canvas.width = window.innerWidth;
    // canvas.height = (canvas.width / this.image.width) * this.image.height; //match canvas aspect ratio to original image

    let ctx = canvas.getContext("2d");
    ctx.canvas.width = ctx.canvas.height = window.innerWidth*.3333;
    ctx.putImageData(imageData, 0, 0);
	}


	private selectFilter() {
		this._filterService.displayFilteredImage(this.filterName);
	}  

}
