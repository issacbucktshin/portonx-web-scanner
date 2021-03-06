import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NavigationModel } from 'src/app/model/navigation/navigation.model';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent {
    title: string = environment.application.title;
    logo: string = '/assets/images/logo.png';
    topNavigation: NavigationModel[];
    @Output() clicked = new EventEmitter;
    constructor() { }

    toggleMenu() {
        this.clicked.emit();
    }
    logout() { }
}