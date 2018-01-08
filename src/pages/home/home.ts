import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddReviewPage } from '../add-review/add-review';
import { ReviewsProvider } from '../../providers/reviews/reviews';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  reviews: any = [];
  noReviews: boolean = false;
  loading: boolean = true;

  constructor(public navCtrl: NavController, public reviewService: ReviewsProvider, public modalCtrl: ModalController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.reviewService.getReviews().then(data => {
      let reviews: any[] = data;
      
      if (reviews.length>0) {
        this.loading = false;
        this.reviews = data;
      }else {
         this.loading = false;
         this.noReviews = true;
        //  this.reviews = [{title: 'test', description: 'test', rating: 88}];
         console.log('ok')
      }
    });
  }

  addReview() {
    let modal = this.modalCtrl.create(AddReviewPage);

    modal.onDidDismiss(review => {
      if (review) {
        let title = review.title;
        let rating = review.rating;
        
        if (title&&(rating&&rating>0)) {
          this.reviews.push(review);
          this.reviewService.createReview(review);
          this.noReviews = false;
        }else {
          this.alert({
            title: 'Error !',
            subTitle: 'Title and rating fields are required',
            buttons: ['Ok']
          });
        }
      }
    });

    modal.present();
  }

  deleteReview(review) {
    // Remove locally
    let index = this.reviews.indexOf(review);

    if (index > -1) this.reviews.splice(index, 1);

    if (this.reviews.length<1) this.noReviews = true;
    
    // Remove from db
    this.reviewService.deleteReview(review._id);
  }

  alert(message: any) {
    var options = {};

    if (typeof message == 'object') {
      options = message;
    }else {
      options = {subTitle: message, buttons: ['Ok']};
    }

    let alert = this.alertCtrl.create(options);

    alert.present();
  }
}
