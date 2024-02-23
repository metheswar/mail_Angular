import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { User } from './user.model';

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
  error: any;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null,
  error: null
};
export interface AppState {
    auth: AuthState; 
  }

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    loggedIn: true,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    user: null,
    error
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    loggedIn: true,
    user,
    error: null
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    user: null,
    error
  })),
  on(AuthActions.logout, state => ({
    ...state,
    loggedIn: false,
    user: null,
    error: null
  }))
);
