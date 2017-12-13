import 'rxjs/add/operator/map';

export class FeedItem {
  description: string;
  link: string;
  title: string;
  pubDate: string;

  constructor(description: string, link: string, title: string, pubDate: Date) {
    this.description = description;
    this.link = link;
    this.title = title;
    this.pubDate = FeedItem.formatDate(pubDate);
  }

  static formatDate(date) {
    let monthNames = [
      "Jan", "Feb", "March",
      "Apr", "May", "June", "July",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();

    return day + ' ' + monthNames[monthIndex];
  }
}
