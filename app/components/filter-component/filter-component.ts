import { Component, ViewChild, ElementRef } from '@angular/core';
import { FilterService } from '../../providers/filter-service/filter-service';
/*
  Generated class for the FilterComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'canvas-filter',
  templateUrl: 'build/components/filter-component/filter-component.html',
  providers: [FilterService]
})
export class FilterComponent {

	@ViewChild("canvas") filterCanvas: ElementRef;
	private originalCanvas: any;
	private originalCtx: CanvasRenderingContext2D;
	private originalCanvasWidth: number;
	private originalCanvasHeight: number;
	private imageData: ImageData;

	private newCanvas: any;
	private newCtx: CanvasRenderingContext2D;

  constructor(private _filterService: FilterService) {    
    this.originalCanvas = _filterService.getCanvasClone();
    this.originalCtx = this.originalCanvas.getContext("2d")
    this.originalCanvasWidth = this.originalCtx.canvas.width;
    this.originalCanvasHeight = this.originalCtx.canvas.height;
    this.imageData = this.originalCtx.getImageData(0, 0, this.originalCanvasWidth, this.originalCanvasHeight);

    this.newCanvas = this.filterCanvas.nativeElement;
    this.newCtx = this.newCanvas.getContext("2d");
  };


}
