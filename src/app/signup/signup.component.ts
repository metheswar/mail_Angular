import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth.reducer';
import { signupSuccess, signupFailure } from '../auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });

    this.store.pipe(select(state => state.auth.loggedIn))
      .subscribe(loginState => {
        if (loginState) {
          this.router.navigate(['/compose']);
        }
      });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.isLoading = true;
      this.authService.signup(email, password)
        .pipe(take(1))
        .subscribe(
          response => {
            console.log(response);
            this.isLoading = false;
            this.store.dispatch(signupSuccess({ user: response.email }));
            localStorage.setItem('email', response.email);
            this.router.navigate(['/']);
          }, 
          error => {
            console.error(error);
            this.errorMessage = 'Signup failed. Please try again later.';
            this.isLoading = false;
            this.store.dispatch(signupFailure({ error }));
          }
        );
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
