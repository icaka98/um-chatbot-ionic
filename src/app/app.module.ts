import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroSlider } from '../pages/intro_slider/intro_slider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import {ChatBotPage} from "../pages/chat-bot/chat-bot";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    IntroSlider,
    ChatBotPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    IntroSlider,
    ChatBotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
