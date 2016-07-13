import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CameraService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraService {

  imageBase64: Blob;
  constructor() {  
  }

  setImageBase64 (base64String) {
    this.imageBase64 = base64String;
  }

  getImageBase64 () {
    return this.imageBase64;
  }
}

