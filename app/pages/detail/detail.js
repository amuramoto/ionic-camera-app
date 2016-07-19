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
var ionic_angular_1 = require('ionic-angular');
var filter_service_1 = require('../../providers/filter-service/filter-service');
var filter_component_1 = require('../../components/filter-component/filter-component');
/*
  Generated class for the DetailedViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DetailedViewPage = (function () {
    function DetailedViewPage(_nav, _filterService, _viewCtrl) {
        this._nav = _nav;
        this._filterService = _filterService;
        this._viewCtrl = _viewCtrl;
        this.filterNames = this._filterService.getFilterNames();
    }
    DetailedViewPage.prototype.ionViewLoaded = function () {
        this._viewCtrl.setBackButtonText('Cancel');
        this.drawImage();
    };
    DetailedViewPage.prototype.drawImage = function () {
        this.image = this._filterService.getImage();
        var canvas = this.photo.nativeElement;
        canvas.width = canvas.height = window.innerWidth;
        // canvas.height = (canvas.width / this.image.width) * this.image.height; //match canvas aspect ratio to original image
        var ctx = canvas.getContext("2d");
        this._filterService.setOriginalCanvas(canvas);
        this._filterService.drawImage(ctx);
    };
    __decorate([
        core_1.ViewChild("photo"), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailedViewPage.prototype, "photo", void 0);
    DetailedViewPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/detailed-view/detailed-view.html',
            directives: [filter_component_1.FilterComponent]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, filter_service_1.FilterService, ionic_angular_1.ViewController])
    ], DetailedViewPage);
    return DetailedViewPage;
}());
exports.DetailedViewPage = DetailedViewPage;
