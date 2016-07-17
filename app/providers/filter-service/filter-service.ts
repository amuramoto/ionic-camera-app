import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FilterService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FilterService {
  
  private originalCanvas: any;
  private originalCtx: CanvasRenderingContext2D;
  private canvasCopy: any;
  private ctxCopy: CanvasRenderingContext2D;
  private originalImageData: ImageData;
  private image;
  private filterNames: Array<string>;
  public  selectedFilter: Uint8ClampedArray;
  private filteredData = {};
  private filterMatrices: Object = {
        Hayward:   [0.393, 0.769,  0.189, 0,
                0.349, 0.686,  0.168, 0,
                0.272, 0.534, 0.131, 0],
      Stanislaus: [2.14, -1, -0.13, 0,
      -0.5, 1.74, -0.13, 0,
      -0.5, -1, 2.51, 0],
     Sonoma: [0.33, 0.34, 0.33, 0,
                0.33, 0.34, 0.33, 0,
                0.33, 0.34, 0.33, 0],
         Merced: [1.4, 0, .3, 0,
                0, 1.4, 0, 0,
                0, 0, 1.4, 0,
                0,    0,    0, 1],
        Fresno: [1.8, 0, 0, 0,
                0, 1.8, 0, 0,
                0, 0, 1.8, 0],
        
          Riverside: [0.48, 0.54, 0.63, 0,
                0.33, 0.34, 0.33, 0,
                0.33, 0.14, 0.33, 0],
        
          Pomona: [0.28, 0.54, 0.63, 0,
                0.33, 0.34, 0.53, 0,
                0.33, 0.14, 0.33, 0],
        
        Fullerton: [1.16,-0.02,-0.3,0,
                  -0.18,0.92,0.05,0,
                  0.12,-0.49,1.17,0],
        Monterey: [0.72,0.24,0.03,0,0.12,0.84,0.03,0,0.12,0.24,0.63,0],
        Humboldt: [1, 0.4, 0.4, 0,
                    0.8, 0.4, 0.4, 0,
                    0.8, 0.4, 0.4, 0]

    }

  constructor() {    
    this.filterNames = Object.keys(this.filterMatrices);    
  };


  public applyFilter (filterName, imageData) {    
    let filterMatrix: Array<number> = this.filterMatrices[filterName];    
    let d = imageData.data;

    for (var i = 0; i < d.length; i += 4) {

      let red = d[i];
      let green = d[i + 1];
      let blue = d [i +2];
      let alpha = d [i + 3]; 

      d[i] = red*filterMatrix[0] + green*filterMatrix[1] + blue*filterMatrix[2] + alpha*filterMatrix[3];

      d[i+1] = red*filterMatrix[4] + green*filterMatrix[5] + blue*filterMatrix[6] + alpha*filterMatrix[7];

      d[i+2] = red*filterMatrix[8] + green*filterMatrix[9] + blue*filterMatrix[10] + alpha*filterMatrix[11];

    }   

    return imageData;    
  }

  public selectFilter(filterName: string) {
     this.originalCtx.putImageData(this.filteredData[filterName], 0, 0);
  }

  public setImage(image) {
    this.image = image;    
  }

  public getImage() {
    return this.image;

  }

  public setOriginalCanvas(canvas: any) {
    this.originalCanvas = canvas;
    this.originalCtx = this.originalCanvas.getContext("2d");     
    this.copyCanvas(canvas);
    // this.generateFilters();
  }

  private copyCanvas(canvas: any) {
    this.canvasCopy = canvas.cloneNode();
    this.ctxCopy = this.canvasCopy.getContext("2d");
    this.drawImage(this.ctxCopy);
  }

  public drawImage (ctx) {
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.width,
                           0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private generateFilters () {
    for (let filterName of this.filterNames) {    
      let imageDataCopy = this.ctxCopy.getImageData(0, 0, this.ctxCopy.canvas.width, this.ctxCopy.canvas.height);      
      let filteredData = this.applyFilter(filterName, imageDataCopy);      
      this.filteredData[filterName] = filteredData;
    }
  }

  public getFilteredImageData (filterName: string) {
    return this.filteredData[filterName];
  }

  public getFilterNames () {
    return this.filterNames;
  }

  public displayFilteredImage (filterName: string) {
    let imageData = this.ctxCopy.getImageData(0, 0, this.ctxCopy.canvas.width, this.ctxCopy.canvas.height);
    let filteredData = this.applyFilter(filterName, imageData)
    this.originalCtx.putImageData(filteredData, 0, 0);
  }

}

