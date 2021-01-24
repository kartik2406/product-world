import { Injectable } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';

/** A router wrapper, adding extra functions. */
@Injectable()
export class RouterExtraService {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Router event', event, event instanceof NavigationEnd);

        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    console.log('prev url', this.previousUrl);
    return this.previousUrl;
  }
}
