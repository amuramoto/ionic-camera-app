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

	private filterMatrices: Object = {
		sepia: 	[0.393, 0.349, 0.272, 0,
						 0.769, 0.686, 0.534, 0,
						 0.189, 0.168, 0.131, 0],
		grayscale: [0.33, 0.33, 0.33, 0,
								0.59,0.59, 0.59, 0,
								0.11, 0.11, 0.11, 0]			
		}
  constructor(private _filterService: FilterService) {    
    this.image = _filterService.getImage();

    this.originalCanvas = _filterService.getCanvasClone();
    this.originalCtx = this.originalCanvas.getContext("2d")
    this.originalCanvasWidth = this.originalCtx.canvas.width;
    this.originalCanvasHeight = this.originalCtx.canvas.height;
    this.imageData = this.originalCtx.getImageData(0, 0, this.originalCanvasWidth, this.originalCanvasHeight);

    this.newCanvas = this.filterCanvas.nativeElement;    
    this.newCtx = this.newCanvas.getContext("2d");
    this.newCtx.canvas.width = this.newCtx.canvas.height = 50;
  };


  ngAfterViewInit() {
  	console.log('ok')
  	this.newCtx.putImageData(this.imageData, 0, 0);
  }

}
