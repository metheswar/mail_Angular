import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth.reducer';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  public Editor = ClassicEditor;
  composeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.composeForm = this.fb.group({
      toAddress: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      subject: ['', Validators.required],
      emailContent: ['']
    });
    
    this.store.pipe(select(state => state.auth.loggedIn))
      .subscribe(loginState => {
        if (!loginState) {
          this.router.navigate(['/']);
        }
      });
  }

  sendEmail() {
    if (this.composeForm.valid) {
      const message = {
        from: localStorage.getItem('email'),
        subject: this.composeForm.value.subject,
        content: this.composeForm.value.emailContent
      };
      
      // Post message and handle response/error
      this.authService.postMessage(message, this.composeForm.value.toAddress.replace(/[@.]/g, ''))
        .pipe(take(1))
        .subscribe(response => {
          console.log('Message posted successfully:', response);
          this.composeForm.reset();
        }, error => {
          console.error('Error posting message:', error);
        });
  

      const Sentmessage = {
        to: this.composeForm.value.toAddress,
        subject: this.composeForm.value.subject,
        content: this.composeForm.value.emailContent
      };
      this.authService.postSentMessage(Sentmessage, localStorage.getItem('email').replace(/[@.]/g, ''))
        .pipe(take(1))
        .subscribe(response => {
          console.log('Sent message posted successfully:', response);
          this.composeForm.reset();
        }, error => {
          console.error('Error posting sent message:', error);
        });
    }
  }
}
