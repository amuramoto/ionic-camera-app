"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
/*
  Generated class for the FilterService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var FilterService = (function () {
    function FilterService() {
        this.filteredData = {};
        this.filterMatrices = {
            Hayward: [0.393, 0.769, 0.189, 0,
                0.349, 0.686, 0.168, 0,
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
                0, 0, 0, 1],
            Fresno: [1.8, 0, 0, 0,
                0, 1.8, 0, 0,
                0, 0, 1.8, 0],
            Northridge: [0.48, 0.54, 0.63, 0,
                0.33, 0.34, 0.33, 0,
                0.33, 0.14, 0.33, 0],
            Pomona: [0.28, 0.54, 0.63, 0,
                0.33, 0.34, 0.53, 0,
                0.33, 0.14, 0.33, 0],
            Fullerton: [1.16, -0.02, -0.3, 0,
                -0.18, 0.92, 0.05, 0,
                0.12, -0.49, 1.17, 0],
            Monterey: [0.72, 0.24, 0.03, 0,
                0.12, 0.84, 0.03, 0,
                0.12, 0.24, 0.63, 0],
            Humboldt: [1, 0.4, 0.4, 0,
                0.8, 0.4, 0.4, 0,
                0.8, 0.4, 0.4, 0]
        };
        this.filterNames = Object.keys(this.filterMatrices);
    }
    ;
    FilterService.prototype.applyFilter = function (filterName, imageData) {
        var filterMatrix = this.filterMatrices[filterName];
        var d = imageData.data;
        for (var i = 0; i < d.length; i += 4) {
            var red = d[i];
            var green = d[i + 1];
            var blue = d[i + 2];
            var alpha = d[i + 3];
            d[i] = red * filterMatrix[0] + green * filterMatrix[1] + blue * filterMatrix[2] + alpha * filterMatrix[3];
            d[i + 1] = red * filterMatrix[4] + green * filterMatrix[5] + blue * filterMatrix[6] + alpha * filterMatrix[7];
            d[i + 2] = red * filterMatrix[8] + green * filterMatrix[9] + blue * filterMatrix[10] + alpha * filterMatrix[11];
        }
        return imageData;
    };
    FilterService.prototype.selectFilter = function (filterName) {
        this.originalCtx.putImageData(this.filteredData[filterName], 0, 0);
    };
    FilterService.prototype.setImage = function (image) {
        this.image = image;
    };
    FilterService.prototype.getImage = function () {
        return this.image;
    };
    FilterService.prototype.setOriginalCanvas = function (canvas) {
        this.originalCanvas = canvas;
        this.originalCtx = this.originalCanvas.getContext("2d");
        this.copyCanvas(canvas);
        // this.generateFilters();
    };
    FilterService.prototype.copyCanvas = function (canvas) {
        this.canvasCopy = canvas.cloneNode();
        this.ctxCopy = this.canvasCopy.getContext("2d");
        this.drawImage(this.ctxCopy);
    };
    FilterService.prototype.drawImage = function (ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.width, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    FilterService.prototype.generateFilters = function () {
        for (var _i = 0, _a = this.filterNames; _i < _a.length; _i++) {
            var filterName = _a[_i];
            var imageDataCopy = this.ctxCopy.getImageData(0, 0, this.ctxCopy.canvas.width, this.ctxCopy.canvas.height);
            var filteredData = this.applyFilter(filterName, imageDataCopy);
            this.filteredData[filterName] = filteredData;
        }
    };
    FilterService.prototype.getFilteredImageData = function (filterName) {
        return this.filteredData[filterName];
    };
    FilterService.prototype.getFilterNames = function () {
        return this.filterNames;
    };
    FilterService.prototype.displayFilteredImage = function (filterName) {
        var imageData = this.ctxCopy.getImageData(0, 0, this.ctxCopy.canvas.width, this.ctxCopy.canvas.height);
        var filteredData = this.applyFilter(filterName, imageData);
        this.originalCtx.putImageData(filteredData, 0, 0);
    };
    FilterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FilterService);
    return FilterService;
}());
exports.FilterService = FilterService;
