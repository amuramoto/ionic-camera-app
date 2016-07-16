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
        sepia:   [0.393, 0.769,  0.189, 0,
                0.349, 0.686,  0.168, 0,
                0.272, 0.534, 0.131, 0],

    grayscale: [0.33, 0.34, 0.33, 0,
                0.33, 0.34, 0.33, 0,
                0.33, 0.34, 0.33, 0],
         warm: [1.4, 0, .3, 0,
                0, 1.4, 0, 0,
                0, 0, 1.4, 0,
                0,    0,    0, 1],
          red: [0.48, 0.54, 0.63, 0,
                0.33, 0.34, 0.33, 0,
                0.33, 0.14, 0.33, 0],
          blue: [0.48, 0.54, 0.63, 0,
          0.33, 0.34, 0.53, 0,
          0.33, 0.14, 0.33, 0],
          green: [0.48, 0.54, 0.63, 0,
          0.33, 0.34, 0.33, 0,
          0.33, 0.14, 0.63, 0],
          other: [0.48, 0.44, 0.63, 0,
          0.93, 0.24, 0.33, 0,
          0.33, 0.14, 0.33, 0]

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
    this.generateFilters();
  }

  private copyCanvas(canvas: any) {
    this.canvasCopy = canvas.cloneNode();
    this.ctxCopy = this.canvasCopy.getContext("2d");
    this.drawImage(this.ctxCopy);
  }

  public drawImage (ctx) {
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
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
    this.originalCtx.putImageData(this.filteredData[filterName], 0, 0);
  }






  // private grayscale = function(pixels, args) {
  //   var d = pixels.data;
  //   for (var i=0; i<d.length; i+=4) {
  //     var r = d[i];
  //     var g = d[i+1];
  //     var b = d[i+2];
  //     // CIE luminance for the RGB
  //     // The human eye is bad at seeing red and blue, so we de-emphasize them.
  //     var v = 0.2126*r + 0.7152*g + 0.0722*b;
  //     d[i] = d[i+1] = d[i+2] = v
  //   }
  //   return pixels;
  // }

  // private sepia = function (pixels, args) {
  //   var r = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
  //   g = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255],
  //   b = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];

  //   // noise value
  //   var noise = 20;

        
  //       var d = pixels.data;
  //       for (var i=0; i<d.length; i+=4) {

  //           // change image colors
  //           d[i] = r[d[i]];
  //           d[i+1] = g[d[i+1]];
  //           d[i+2] = b[d[i+2]];

  //           // apply noise
  //           if (noise > 0) {
  //               var noise = Math.round(noise - Math.random() * noise);

  //               for(var j=0; j<3; j++){
  //                   var iPN = noise + d[i+j];
  //                   d[i+j] = (iPN > 255) ? 255 : iPN;
  //               }
  //           }
  //       }

  //       return pixels;
    
  //   }

}

