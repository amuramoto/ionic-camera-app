import { Component, ViewChild } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import { FilterService } from '../../providers/filter-service/filter-service';
import { Base64ToGallery, SocialSharing } from 'ionic-native';

/*
  Generated class for the SharePagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/share/share.html',
})
export class SharePage {

	private options: Array<Object> = [
      { label: 'Save Image', icon: 'images' },
      { label: 'Facebook', icon: 'logo-facebook' },
      { label: 'Twitter', icon: 'logo-twitter' },
      { label: 'WhatsApp', icon: 'logo-whatsapp' }
    ];
  private imageData: string;
  private loading: Loading;

  constructor(private _nav: NavController, private _filterService: FilterService) {
  	let canvas: HTMLCanvasElement = this._filterService.getOriginalCanvas();
    this.imageData = canvas.toDataURL();

  }

  private shareImage (option: string) {
  	switch (option) {
      case 'Save Image':
        this.loading = Loading.create({content: 'Saving...'});
        this._nav.present(this.loading)
        this.saveImage();
        break;
      case 'Twitter':
        SocialSharing.shareViaTwitter('', this.imageData);
        break;
      case 'Facebook':
        SocialSharing.shareViaFacebook('', this.imageData);
        break;
    }    
  }

  private saveImage() {    
    Base64ToGallery.base64ToGallery(this.imageData, {prefix: 'ionigram_'}).then(
      res => setTimeout(() => this.loading.dismiss(), 1000),      
      err => setTimeout(() => this.loading.dismiss(), 1000))
  }

}
