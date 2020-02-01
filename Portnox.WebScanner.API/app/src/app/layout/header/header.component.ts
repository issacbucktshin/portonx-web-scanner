import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../model/user/user.model';
import { NavigationModel } from 'src/app/model/navigation/navigation.model';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit {
    user: UserModel;
    title: string = environment.application.title;
    logo: string = '/assets/images/logo.png';
    topNavigation: NavigationModel[];
    @Output() clicked = new EventEmitter;
    constructor() { }

    ngOnInit() {
        this.getCurrentUser();
        this.initTopNavigation();
    }
    initTopNavigation() {
        this.topNavigation = [
            {
                label: "Test 1"
            },
            {
                label: "Test 2"
            },
            {
                label: "Test 3"
            },
            {
                label: "Test 4"
            },
            {
                label: "Test 5"
            }
        ];
    }
    toggleMenu() {
        this.clicked.emit();
    }
    getCurrentUser() {
        //imp get current user
        this.user = new UserModel;
        this.user.firstName = "Etay";
        this.user.lastName = "Yosef";
    }
    login() {
    }
}