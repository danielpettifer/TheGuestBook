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
    agree: boolean;
    errors = [];

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

    onSubmit() {
        this.errors = [];

        if (!this.firstName) {
            this.errors.push('Please type your first name');
        }
        if (!this.lastName) {
            this.errors.push('Please type your last name');
        }
        if (!this.email) {
            this.errors.push('Please type your email address');
        }
        if (!this.agree) {
            this.errors.push('Please confirm you agree with our data usage');
        }

        if (this.errors.length === 0) {
            this.submitData();
        } else {
            this.invalidData();
        }
    }

    async invalidData() {
        const alert = await this.alertController.create({
            header: 'Please correct the following errors',
            message: this.errors.join('<br />'),
            buttons: [{
                text: 'Okay',
            }]
        });
        await alert.present();
    }

    async confirmSucces() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.message = '';
        this.agree = false;

        const alert = await this.alertController.create({
            header: 'Thank you',
            message: 'Thank you for signing up',
            buttons: [{
                text: 'Okay',
            }]
        });
        await alert.present();
    }

    submitData() {
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
                this.confirmSucces();
                // console.log(data.status);
                console.log({data}); // data received by server
                // console.log(data.headers);
            });
    }
}
