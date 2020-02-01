import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { Routes, RouterModule } from '@angular/router';
import { scannerRoutes } from './scanner.route';
import { AppSharedModule } from '../shared/shared.moduel';
import { WebScannerComponent } from './web/web-scanner.component';

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
  ]
})
export class ScannerModule { }
