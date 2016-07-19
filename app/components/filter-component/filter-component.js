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
var filter_service_1 = require('../../providers/filter-service/filter-service');
/*
  Generated class for the FilterComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var FilterComponent = (function () {
    function FilterComponent(_filterService) {
        this._filterService = _filterService;
    }
    ;
    FilterComponent.prototype.ngOnInit = function () {
        var canvas = this.canvasElement.nativeElement;
        canvas.width = canvas.height = 125;
        var ctx = canvas.getContext("2d");
        this._filterService.drawImage(ctx);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var filteredData = this._filterService.applyFilter(this.filterName, imageData);
        ctx.putImageData(filteredData, 0, 0);
    };
    FilterComponent.prototype.selectFilter = function () {
        this._filterService.displayFilteredImage(this.filterName);
    };
    __decorate([
        core_1.ViewChild("canvas"), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "canvasElement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FilterComponent.prototype, "filterName", void 0);
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'filter',
            templateUrl: 'build/components/filter-component/filter-component.html'
        }), 
        __metadata('design:paramtypes', [filter_service_1.FilterService])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
