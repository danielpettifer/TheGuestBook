import { Component } from "@angular/core";
import { ModalController } from "../../../node_modules/@ionic/angular";
import { TermsAndConditionsPage } from "../terms-and-conditions/terms-and-conditions.page";
import { HttpClient } from "@angular/common/http";
import { Form, FormGroup } from '../../../node_modules/@angular/forms';

import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  firstName: String = "";
  lastName: String = "";
  email: String = "";
  phone: String = "";
  message: String = "";

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public http: HttpClient
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: TermsAndConditionsPage
    });

    await modal.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  handleSubmit() {
   
    console.log(this.http);
    this.http
      .post("http://inoveb.co.uk/guest-book/in.php", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        message: this.message
      })
      
      .subscribe(data => {
        //console.log(data.status);
        console.log({ data }); // data received by server
        //console.log(data.headers);
      });
      
  }
}
