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
var detailed_view_1 = require('../detailed-view/detailed-view');
var ionic_native_1 = require('ionic-native');
var filter_service_1 = require('../../providers/filter-service/filter-service');
var HomePage = (function () {
    function HomePage(_nav, _filterService) {
        this._nav = _nav;
        this._filterService = _filterService;
    }
    HomePage.prototype.ionViewLoaded = function () { console.log('LOADED'); };
    HomePage.prototype.ngOnInit = function () { console.log('NGONINIT'); };
    HomePage.prototype.takePicture = function () {
        var _this = this;
        ionic_native_1.Camera.getPicture({
            quality: 10,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: ionic_native_1.Camera.DestinationType.DATA_URL,
            sourceType: ionic_native_1.Camera.PictureSourceType.CAMERA,
        })
            .then(function (file_uri) { return _this.cameraSuccess(file_uri); }, function (err) { return console.log(err); });
    };
    HomePage.prototype.showGallery = function () {
        var _this = this;
        ionic_native_1.Camera.getPicture({
            destinationType: ionic_native_1.Camera.DestinationType.DATA_URL,
            sourceType: ionic_native_1.Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: ionic_native_1.Camera.EncodingType.JPEG,
            correctOrientation: true
        })
            .then(function (file_uri) { return _this.cameraSuccess(file_uri); }, function (err) { return console.log(err); });
    };
    HomePage.prototype.cameraSuccess = function (file_uri) {
        var _this = this;
        var image = new Image();
        image.onload = function () {
            _this._filterService.setImage(image);
            _this._nav.push(detailed_view_1.DetailedViewPage);
        };
        image.src = "file_uri;;
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, filter_service_1.FilterService])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
