import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";

declare let ApiAIPromises: any;

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat-bot.html',
  queries:{
    content: new ViewChild('content')
  }
})
export class ChatBotPage {

  username: string = '';
  message: string = '';
  messages: object[] = [];
  loading: boolean = false;
  content: any;

  pages:any = [{title: "Home", component: HomePage},
    {title: "ChatBot", component: ChatBotPage}];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController, public ngZone: NgZone) {
    this.username = this.navParams.get('username');

    ApiAIPromises.init({
      clientAccessToken: "09e7a74f2db44289880c29c987734587"
    })
      .then((result) =>  console.log(result));
  }

  openPage(page) {
    if(page.component === ChatBotPage){
      this.menuCtrl.toggle();
    }else{
      this.navCtrl.setRoot(page.component);
    }
  }

  sendMessage() {
    this.messages.push({
      username: this.username,
      message: this.message
    });

    this.scrollToBottom();

    let delay = ( function() {
      let timer = 0;
      return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    let obj = this;
    this.loading = true;

    ApiAIPromises.requestText({
      query: this.message
    })
      .then(({result: {fulfillment: {speech}}}) => {
        this.ngZone.run(()=> {
          obj.message = '';
          delay(function () {
            obj.addBotMessage(speech);
            obj.loading = false;
            obj.scrollToBottom();
          }, 1500);
        });
      });

    this.scrollToBottom();
  }

  setMessage(mes){
    this.message = mes;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    });
  }

  addBotMessage(botMessage){
    this.message = botMessage;

    this.messages.push({
      username: 'ChatBot',
      message: this.message
    });

    this.message = '';
  }
}
