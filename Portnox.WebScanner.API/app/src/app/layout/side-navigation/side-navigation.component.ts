import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MenuItems } from './side-navigation-routes.config';
import { NavigationModel } from '../../model/navigation/navigation.model';
// import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'side-navigation',
    templateUrl: 'side-navigation.component.html',
    styleUrls: ['side-navigation.component.scss']
})

export class SideNavigationComponent implements OnInit {
    @Input() expand: boolean;
    menuItems: NavigationModel[];
    config: any;
    constructor(private router: Router) { }

    ngOnInit() {
        this.menuItems = MenuItems;
        // this.translateMenuLabels(this.menuItems);
        this.config = {
            rtlLayout: environment.ui.rtl,
            classname: ""
        }
    }
    // translateMenuLabels(items: NavigationModel[]) {
    //     if (!items)
    //         return;
    //     for (let index = 0; index < items.length; index++) {
    //         const element = items[index];
    //         this.translateService.get(element.label).subscribe(s => element.label = s);
    //         this.translateMenuLabels(element.items);
    //     }
    // }
    ngOnChanges(change: SimpleChanges): void {
        this.updateConfig(change['expand'].currentValue);
    }
    onSelectedItem(item: NavigationModel) {
        console.log('on selected item', item);
        //redirect user to extrenal page
        if (item.externalRedirect) {
            window.location.href = item.link;
        }
        else {
            this.router.navigate([item.link]);
        }
    }
    updateConfig(expand: boolean) {
        console.log('exapnd', expand);
        this.config = {
            rtlLayout: environment.ui.rtl,
            classname: expand ? 'expand' : ''
        }
    }
}