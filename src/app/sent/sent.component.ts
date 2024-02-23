import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth.reducer';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';


interface Message {
  content: string;
  subject: string;
  to: string;
}

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  sentMessages: { [key: string]: Message } = {}; // Define a variable to store sent messages
  sentMessagesLength: number = 0; // Variable to store the length of sent messages
  selectedMessage: Message | null = null; // Variable to store the selected message

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(state => state.auth.loggedIn))
      .pipe(take(1)) // Take only the first value emitted
      .subscribe(loginState => {
        if (!loginState) {
          this.router.navigate(['/']);
        } else {
          this.loadSentMessages();
        }
      });
  }

  loadSentMessages() {
    // Assuming you have the email stored somewhere, let's say in localStorage
    let email = localStorage.getItem('email');

    if (email) {
      // Replace characters in email if needed
      email = email.replace(/[@.]/g, '');

      this.authService.getSentMessages(email)
        .pipe(take(1)) // Take only the first value emitted
        .subscribe(
          messages => {
            this.sentMessages = messages;
            this.sentMessagesLength = Object.keys(messages).length; // Calculate the length
            console.log('Sent messages:', this.sentMessages);
          },
          error => {
            console.error('Error fetching sent messages:', error);
          }
        );
    } else {
      console.error('Email not found.');
    }
  }

  openMessageModal(message: Message) {
    this.selectedMessage = message;
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
  }
}
