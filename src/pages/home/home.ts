import {Component} from '@angular/core';
import {MenuController, NavController} from "ionic-angular";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ChatBotPage} from "../chat-bot/chat-bot";
import $ from 'jquery';
import xml2js from 'xml2js';
import {FeedItem} from "../../providers/feed";
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages:any = [{title: "Home", component: HomePage, icon: "home"},
    {title: "ChatBot", component: ChatBotPage, icon: "chatboxes"}];
  private news: any;

  constructor(private nav: NavController, public http: Http,
              public menuCtrl: MenuController, private iab: InAppBrowser) {
    this.news = [];
    this.refreshNews();
  }

  refreshNews(){
    this.http.get('https://www.maastrichtuniversity.nl/news/rss')
      .toPromise().then(res => {
      let jsonData;

      xml2js.parseString(res.text(), function (err, result) {
          jsonData = (result);
        });

        let allItems = jsonData.rss.channel[0].item;
        let allNews = [];

        $(allItems).each(function () {
            let el = this;

            allNews.push(new FeedItem(el.description, el.link, el.title, new Date(el.pubDate)));
        });

        this.news = allNews;
      });
  }

  openArticle(link){
    let ref = this.iab.create(link);
    ref.show();
  }

  openPage(page) {
    if(page.component === HomePage){
      this.refreshNews();
    }else{
      this.nav.setRoot(page.component);
    }
    this.menuCtrl.toggle();
  }
}
