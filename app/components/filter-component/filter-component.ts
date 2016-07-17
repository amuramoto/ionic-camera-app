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

  constructor(private _filterService: FilterService) {};

	ngOnInit(){
    let canvas = this.canvasElement.nativeElement;		
    
    canvas.width = canvas.height = 125;
    
    let ctx = canvas.getContext("2d"); 
    
    this._filterService.drawImage(ctx);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let filteredData = this._filterService.applyFilter(this.filterName, imageData);
    ctx.putImageData(filteredData, 0, 0);
	}


	private selectFilter() {
		this._filterService.displayFilteredImage(this.filterName);
	}  

}
