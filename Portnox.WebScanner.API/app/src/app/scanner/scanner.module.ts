import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { Routes, RouterModule } from '@angular/router';
import { scannerRoutes } from './scanner.route';
import { AppSharedModule } from '../shared/shared.moduel';
import { WebScannerComponent } from './web/web-scanner.component';
import { ScannerService } from './scanner.service';

const routes: Routes = [
  {
    path: '',
    component: ScannerComponent,
    children: scannerRoutes
  }
]

@NgModule({
  declarations: [ScannerComponent, WebScannerComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    ScannerService
  ]
})
export class ScannerModule { }
