import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {FilterService} from './providers/filter-service/filter-service';

@Component({
  template: '<ion-nav swipeBackEnabled="false" [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.hide();
    });
  }
}

ionicBootstrap(MyApp, [FilterService], {statusbarPadding: false});
