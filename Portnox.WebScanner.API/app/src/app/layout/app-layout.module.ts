import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared/shared.moduel';

import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { MatListModule } from '@angular/material/list';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    imports: [
        RouterModule,
        NgMaterialMultilevelMenuModule,
        AppSharedModule,
        MatListModule,
        MatMenuModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideNavigationComponent
    ],
    declarations: [
        MainComponent,
        HeaderComponent,
        FooterComponent,
        SideNavigationComponent,
        PageNotFoundComponent
    ],
    providers: [],
})
export class AppLayoutModule { }
