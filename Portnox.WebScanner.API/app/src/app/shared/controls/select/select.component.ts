import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'select-box',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss']
})

export class SelectComponent implements OnInit, OnDestroy {
    valueControl = new FormControl;
    searchControl = new FormControl;
    @Input('values') allValues: any[] = [];
    @Input() multiple:boolean;
    @Input() placeholder: string = "Select value";
    @Input() displayProperty: string = "name";
    @Input() filters: string[] = ["name"];
    @Output() selected = new EventEmitter;
    selectAll:boolean;
    values: any[] = [];

    subscriber: Subscription;

    constructor() { }

    ngOnInit() {
        this.values = this.allValues;
        this.subscriber = this.valueControl.valueChanges
            .subscribe(
                value => {
                    console.log("value", value);
                    this.selected.emit(value);
                }
            );
        this.searchControl.valueChanges
            .subscribe(
                query => {
                    if (!query || query == "") {
                        this.values = this.allValues;
                        return;
                    }
                    this.filter(query);
                }
            );
    }
    filter(query: string) {
        this.values = this.allValues.filter(v => {
            let apply: boolean = false;
            for (let i = 0; i < this.filters.length; i++) {
                let property: string = this.filters[i];
                if (v[property].toLowerCase().indexOf(query.toLowerCase()) != -1) {
                    apply = true;
                    break;
                }
            }
            return apply;
        });
    }
    //select or deselct all values
    toggleAll(select:boolean){
        this.selectAll = select;
        let values:any[] = this.selectAll ? this.values : [];
        this.valueControl.setValue(values);
    }
    c(event:Event){
        console.log("event",event);
        // event.stopPropagation();
        event.stopImmediatePropagation();
    }
    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}