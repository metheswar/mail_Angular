import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth.reducer';
import { loginSuccess, loginFailure } from '../auth.action'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>, 
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;
      this.authService.signin(email, password)
        .pipe(take(1))
        .subscribe(response => {
          console.log(response); 
          this.isLoading = false;
          if (response.registered) {
            this.store.dispatch(loginSuccess({ user: response.email }));
            localStorage.setItem('email', response.email);
          }
        }, error => {
          console.error(error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          this.isLoading = false;
          this.store.dispatch(loginFailure({ error }));
        });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password');
    if (passwordField) {
      passwordField.setAttribute('type', this.showPassword ? 'text' : 'password');
    }
  }
}
