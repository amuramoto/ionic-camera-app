import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import { CameraPreview, File } from 'ionic-native';
import { FilterService } from '../../providers/filter-service/filter-service'
import { DetailPage } from '../detail/detail';
/*
  Generated class for the CameraPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/camera/camera.html',
})

export class CameraPage {

	@ViewChild('navbar') navbar;
  private loading: Loading;

  constructor(private _nav: NavController, private _filterService: FilterService) {

  }

	ionViewDidEnter () {
		
		let options = {
	    x: 0, 
	    y: this.navbar.elementRef.nativeElement.clientHeight,
	    width: window.innerWidth, 
	    height: window.innerWidth, 
	    camera: "rear", 
	    tapPhoto: true, 
	    previewDrag: true, 
	    toBack: false, 
	    alpha: 1
	  }
	
		CameraPreview.startCamera(options);

		CameraPreview.setOnPictureTakenHandler().subscribe(result => {

			let image = new Image();		
			let file_uri = result[0];
			File.readAsDataURL(file_uri).then(dataURL => {				
				image.onload = () => {					
					image.width = image.height = window.innerWidth;
					this._filterService.setImage(image);      
		      this._nav.push(DetailPage);
		      this.loading.dismiss();
		    }
		    image.src = dataURL;
			}, err => console.log(err));
		});
	}

	takePicture () {
		this.loading = Loading.create({cssClass: 'cameraLoading'});
		this._nav.present(this.loading);
		CameraPreview.hide();
		CameraPreview.takePicture({maxWidth: 1500, maxHeight: 1500});
	}

	

}
