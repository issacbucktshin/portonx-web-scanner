import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'inline-spinner',
    templateUrl: 'inline-spinner.component.html',
    styleUrls:['inline-spinner.component.scss']
})

export class InlineSpinnerComponent implements OnInit {
    @Input() backgroundColor:string ="#fff";
    constructor() { }

    ngOnInit() { }
}