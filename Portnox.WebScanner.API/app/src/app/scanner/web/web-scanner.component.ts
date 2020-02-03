import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ScannerService } from '../scanner.service';
import { finalize } from 'rxjs/operators';
import { WebScannerResultModel } from 'src/app/model/sacnner/web-scanner-result.model';
import { HelperService } from 'src/app/general/helper/helper.service';
import { WebScannerParamsModel } from 'src/app/model/sacnner/web-scanner-params.model';

@Component({
  selector: 'app-web-scanner',
  templateUrl: './web-scanner.component.html',
  styleUrls: ['./web-scanner.component.scss']
})
export class WebScannerComponent implements OnInit {
  // filters
  filtersForm: FormGroup;
  filters: any[];
  scanResult: WebScannerResultModel[];
  loading: boolean;
  scraping: boolean;
  columns: any[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<WebScannerResultModel> = null;

  constructor(
    private formBuilder: FormBuilder,
    private scannerService: ScannerService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.initFilters();
    this.createColumns();
    this.createFilters();
  }
  initFilters() {
    this.filters = [
      { property: 'url', label: "Predefined URL", type: 'text' },
      { property: 'threads', label: "Maximum threads", type: 'number' },
      { property: 'text', label: "Text", type: 'text' },
      { property: 'pages', label: "Maximum pages", type: 'number' },
    ]

  }

  createFilters() {
    this.filtersForm = this.formBuilder
      .group({
        url: ['https://www.portnox.com/', [Validators.required]],
        threads: [1, []],
        text: ['Program', [Validators.required]],
        pages: [10, []]
      })
  }
  createColumns() {
    this.columns = [
      { field: 'page', header: "Page", type: 'link' },
      { field: 'entrances', header: "Entrances" },
      { field: 'error', header: "Error", type: 'boolean' },
      { field: 'errorMessage', header: "Error message" }
    ];
    this.displayedColumns = this.columns.map(x => x.name);
  }

  scan() {
    this.loading = true;
    const filter: WebScannerParamsModel = this.filtersForm.value;
    this.scannerService.scrapSite(filter)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        result => this.scanResult = result,
        error => this.helperService.handleHttpErrors(error))
  }
}
