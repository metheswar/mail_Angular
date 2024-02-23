import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../auth.reducer';
import * as AuthActions from '../auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavbarOpen: boolean = false;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loggedIn$ = this.store.pipe(select(state => state.auth.loggedIn));
  }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
