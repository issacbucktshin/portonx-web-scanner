import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { WebScannerComponent } from './web/web-scanner.component';

export const scannerRoutes: Routes = [
    { path: '', redirectTo: 'web', pathMatch: 'full' },
    { path: 'web', component: WebScannerComponent },
];