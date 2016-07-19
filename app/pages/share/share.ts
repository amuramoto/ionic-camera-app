import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilterService } from '../../providers/filter-service/filter-service';
import {Base64ToGallery} from 'ionic-native';

/*
  Generated class for the SharePagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/share/share.html',
})
export class SharePage {

	private options: Array<Object>;

  constructor(private nav: NavController, private _filterService: FilterService) {
  	this.options = [
  		{ label: 'Save Image', icon: 'images' },
  		{ label: 'Facebook', icon: 'logo-facebook' },
  		{ label: 'Twitter', icon: 'logo-twitter' },
  		{ label: 'SMS', icon: 'chatbubbles' }
  	]
  }

  shareImage (option) {
  	if (option == 'Save Image') {

  		let canvas = this._filterService.getOriginalCanvas();
  		let dataUrl = canvas.toDataURL();

  		Base64ToGallery.base64ToGallery(dataUrl, 'ionigram_', true).then(
			  res => console.log("Saved image to gallery ", res),
			  err => console.log("Error saving image to gallery ", err)
			);
  	} else {

  	}
  }

}
