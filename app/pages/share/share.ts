import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  private message: string;
  private image: any;

  constructor(private nav: NavController, private _filterService: FilterService) {
  	let canvas = this._filterService.getOriginalCanvas();
    this.image = canvas.toDataURL();

  }

  private shareImage (option) {
  	switch (option) {
      case 'Save Image':
        this.saveImage();
        break;
      case 'Twitter':
      console.log(this.message)
        SocialSharing.shareViaTwitter(this.message, this.image);
        break;
      case 'Facebook':
        SocialSharing.shareViaFacebook(this.message, this.image);
        break;
    }    
  }

  private saveImage() {    
    Base64ToGallery.base64ToGallery(this.image, 'ionigram_').then(
      res => console.log("Saved image to gallery ", res),
      err => console.log("Error saving image to gallery ", err))
  }

}
