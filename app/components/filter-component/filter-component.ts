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

	@ViewChild("canvas") filterCanvas: ElementRef;
	
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
		this.image = this._filterService.getImage();
	}

  ngAfterViewInit() {
  	this.canvas = this.filterCanvas.nativeElement;    
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = this.ctx.canvas.height = window.innerWidth*.3333;
  	this.image.onload = () => {
		this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.imageData = this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		
		let filteredData: any = this._filterService.applyFilter(this.filterName, this.imageData);
		this.ctx.putImageData(filteredData,0,0)

  	}
  }

	private selectFilter() {
		this._filterService.selectFilter(this.filterName);
	}  

}
