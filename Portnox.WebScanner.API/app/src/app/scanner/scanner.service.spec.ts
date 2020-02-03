import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
  let scannerService: ScannerService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      scannerService
    ],

  }));

  it('should be created', () => {
    const service: ScannerService = TestBed.get(ScannerService);
    expect(service).toBeTruthy();
  });
});
