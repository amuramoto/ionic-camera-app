import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FilterService } from '../../providers/filter-service/filter-service';
import { FilterComponent } from '../../components/filter-component/filter-component';
import { SharePage } from '../../pages/share/share';

/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/detail/detail.html',
  directives: [FilterComponent]
})
export class DetailPage {

	@ViewChild("photo") photo: ElementRef;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;	
	image: HTMLImageElement;
  filterNames: Array<string>;
  constructor(private _nav: NavController, private _filterService: FilterService, private _viewCtrl: ViewController) {
  	this.filterNames = this._filterService.getFilterNames();
  }

  ionViewLoaded () {	
    this._viewCtrl.setBackButtonText('Cancel');
    this.drawImage();    
	}

  private drawImage () {
  	let ctx;          
    let canvas = this.photo.nativeElement;
    
    canvas.width = canvas.height = window.innerWidth;
    ctx = canvas.getContext("2d");	

    this._filterService.setOriginalCanvas(canvas);	
    this._filterService.drawImage(ctx);
    
  }	

  private navToSharePage() {
    this._nav.push(SharePage);
  }

}
