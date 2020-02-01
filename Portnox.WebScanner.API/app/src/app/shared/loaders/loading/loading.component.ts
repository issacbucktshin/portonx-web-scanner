import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Input() color:string = "#6eac1b";
    @Input() absolute:boolean;
    @Input() top:number = 120;
    constructor() { }

    ngOnInit() { }
}