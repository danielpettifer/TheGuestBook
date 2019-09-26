import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TermsAndConditionsPage} from '../terms-and-conditions/terms-and-conditions.page';
import {HttpClient} from '@angular/common/http';

import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    errors = {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        message: null,
    };

    constructor(
        public alertController: AlertController,
        public modalController: ModalController,
        public http: HttpClient
    ) {
    }

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

                        if (!this.firstName) {
                            this.errors.firstName = 'Please type your first name';
                        } else {
                            this.errors.firstName = null;
                        }

                        if (!this.lastName) {
                            this.errors.lastName = 'Please type your last name';
                        } else {
                            this.errors.lastName = null;
                        }

                        if (!this.email) {
                            this.errors.email = 'Please type your email address';
                        } else {
                            this.errors.email = null;
                        }

                        if (!this.phone) {
                            this.errors.phone = 'Please type your phone number';
                        } else {
                            this.errors.phone = null;
                        }

                        if (!this.message) {
                            this.errors.message = 'Please type your message';
                        } else {
                            this.errors.message = null;
                        }

                        if (!this.errors.firstName &&
                            !this.errors.lastName &&
                            !this.errors.message &&
                            !this.errors.phone &&
                            !this.errors.email
                        ) {
                            this.handleSubmit();
                        }
                    }
                }
            ]
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log({result});
    }

    onInputChange(field) {
        this.errors[field] = null;
    }

    handleSubmit() {
        console.log(this.http);
        this.http
            .post('http://inoveb.co.uk/guest-book/in.php', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                message: this.message
            })

            .subscribe(data => {
                // console.log(data.status);
                console.log({data}); // data received by server
                // console.log(data.headers);
            });

    }
}
