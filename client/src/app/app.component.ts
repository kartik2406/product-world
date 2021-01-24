import { Component } from '@angular/core';
import { RouterExtraService } from './services/routerExtraService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(private routerExtras: RouterExtraService) {}
}
