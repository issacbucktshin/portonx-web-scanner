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
  scannerService = TestBed.get(scannerService);
  httpMock = TestBed.get(HttpTestingController);


  it(`should fetch posts as an Observable`, async(inject([HttpTestingController, ScannerService],
    (httpClient: HttpTestingController, scannerService: ScannerService) => {

      const results = [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ];


      scannerService.scrapSite({ pages: 1, text: 'hello', threads: 1, url: 'https://www.positronx.io/angular-unit-testing-application-with-jasmine-karma/' })
        .subscribe((results: any) => {
          expect(results.length).toBe(3);
        });

      let req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toBe("GET");

      req.flush(results);
      httpMock.verify();

    })));
  it('should be created', () => {
    const service: ScannerService = TestBed.get(ScannerService);
    expect(service).toBeTruthy();
  });
});
