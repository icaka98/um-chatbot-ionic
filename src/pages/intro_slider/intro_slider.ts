import {Component, ViewChild} from '@angular/core';
import {App, NavController, Slides} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'intro_slider.html'
})

export class IntroSlider {
  @ViewChild(Slides) slides: Slides;


  constructor(private nav: NavController) {
  }

  complete() {
    this.nav.setRoot(HomePage);
  }

  nextSlide(){
    this.slides.slideNext();
  }

  prevSlide(){
    this.slides.slidePrev();
  }
}
