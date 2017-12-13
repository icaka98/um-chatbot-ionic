import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {ChatBotPage} from "../chat-bot/chat-bot";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatBotPage;

  constructor() {

  }
}
