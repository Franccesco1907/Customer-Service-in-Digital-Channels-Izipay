import { Component,ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  mobileQuery: MediaQueryList;
  fillerNav= [
    {name: 'Home', route: 'customerService', icon:'home'},
    {name: 'Tickets', route: 'ticket', icon:'description'},
  ]
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private router: Router,
     ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.router.navigate(['/auth']).catch((error) => {
      console.error('Error al navegar a /login', error);
    });
  }
}
