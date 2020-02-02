import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebScannerResultModel } from '../model/sacnner/web-scanner-result.model';
import { environment } from 'src/environments/environment';
import { WebScannerParamsModel } from '../model/sacnner/web-scanner-params.model';
import { HelperService } from '../general/helper/helper.service';

@Injectable()
export class ScannerService {
  private api: string = `${environment.api}/scanner`;
  constructor(
    private helperService: HelperService,
    private httpClient: HttpClient
  ) { }

  scrapSite(params: WebScannerParamsModel) {
    let url: string = `${this.api}/web`;
    url += this.helperService.buildQueryString(params);
    return this.httpClient.get<WebScannerResultModel[]>(url);
  }
}
