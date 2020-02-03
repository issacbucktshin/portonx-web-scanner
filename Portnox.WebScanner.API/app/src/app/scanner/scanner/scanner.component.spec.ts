import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerComponent } from './scanner.component';
import { ScannerModule } from '../scanner.module';
import { AppSharedModule } from 'src/app/shared/shared.moduel';

describe('ScannerComponent', () => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerComponent ],
      imports:[ScannerModule,AppSharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
