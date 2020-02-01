import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  auth: boolean;
  expandSidenav: boolean;
  ngOnInit() {
    this.auth = true;
  }
}
