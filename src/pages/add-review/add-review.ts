import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';


@Component({
  selector: 'add-review-page',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {
  title: string;
  description: string;
  rating: any;

  constructor(public viewCtrl: ViewController) {}

  save(): void {
    let review = {
      title: this.title,
      description: this.description,
      rating: this.rating
    };

    this.viewCtrl.dismiss(review);
  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
