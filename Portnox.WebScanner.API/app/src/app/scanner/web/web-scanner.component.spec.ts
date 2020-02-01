import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebScannerComponent } from './web-scanner.component';

describe('WebScannerComponent', () => {
  let component: WebScannerComponent;
  let fixture: ComponentFixture<WebScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
