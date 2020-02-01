import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'play-spinner',
    templateUrl: 'play-effect-spinner.component.html',
    styleUrls:["play-effect-spinner.component.scss"]
})
export class PlayEffectSpinnerComponent implements OnInit {
    @Input() color:string;
    constructor() { }

    ngOnInit() { }
}