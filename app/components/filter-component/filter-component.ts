import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { FilterService } from '../../providers/filter-service/filter-service';
/*
  Generated class for the FilterComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'filter',
  templateUrl: 'build/components/filter-component/filter-component.html',
  providers: [FilterService]
})
export class FilterComponent {

	@ViewChild("canvas") filterCanvas: ElementRef;
	
	@Input () filterName: string;

	private originalCanvas: any;
	private originalCtx: CanvasRenderingContext2D;
	private originalCanvasWidth: number;
	private originalCanvasHeight: number;
	private imageData: ImageData;
	private image: any;
	private newCanvas: any;
	private newCtx: CanvasRenderingContext2D;

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
  	this.newCanvas = this.filterCanvas.nativeElement;    
    this.newCtx = this.newCanvas.getContext("2d");
    this.newCtx.canvas.width = this.newCtx.canvas.height = window.innerWidth*.3333;
  	this.image.onload = () => {
		this.newCtx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.newCtx.canvas.width, this.newCtx.canvas.height);

		let filteredData = this._filterService.applyFilter(this.filterName, this.newCtx.getImageData(0,0,this.newCtx.canvas.width,this.newCtx.canvas.height));
		this.newCtx.putImageData(filteredData,0,0)

  	}
  }

}
