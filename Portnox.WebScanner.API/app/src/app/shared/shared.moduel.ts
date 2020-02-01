import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**  Loading and spinners */
import { PlayEffectSpinnerComponent } from './loaders/play-effect/play-effect-spinner.component';
import { LoadingComponent } from './loaders/loading/loading.component';
import { InlineSpinnerComponent } from './loaders/inline-spinner/inline-spinner.component';


/** Pipes */
import { DateFormatPipe } from './pipes/date/date-format.pipe';
import { DefaultPathPipe } from './pipes/default-path/default-path.pipe';


/* Material modules */
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
/** PrimeNg Modules  */
import {TableModule} from 'primeng/table';
import { SelectComponent } from './controls/select/select.component';
import { AutofocusDirective } from './directives/focus/auto-focus.directive';
import { SidebarModule } from 'primeng/sidebar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatCheckboxModule,
        MatSelectModule,
        ContextMenuModule,
        MatChipsModule,
        MatAutocompleteModule,
        ConfirmDialogModule   
    ],
    exports: [
        /* Angular  */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        /* loaders  */
        PlayEffectSpinnerComponent,
        LoadingComponent,
        InlineSpinnerComponent,
        /* Material  */        
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatAutocompleteModule,
        /* Primeng  */        
        TableModule,
        SidebarModule,
        ContextMenuModule,  
        ConfirmDialogModule,      
        /* Directives  */ 
        AutofocusDirective,
        /* pipes  */  
        DateFormatPipe,              
        DefaultPathPipe,
        /* Componenet  */  
        SelectComponent
        
    ],
    declarations: [
        /* loaders  */
        LoadingComponent,
        PlayEffectSpinnerComponent,
        InlineSpinnerComponent,
         /* Directives  */ 
         AutofocusDirective,
        /* pipes  */
        DateFormatPipe,
        DefaultPathPipe,
         /* Componenet  */  
         SelectComponent
        
    ],
    providers: [
        ConfirmationService
    ],
})
export class AppSharedModule { }
