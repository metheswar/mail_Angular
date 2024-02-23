// inbox.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../auth.reducer';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
interface Message {
  subject: string;
  from: string;
  content: string;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inboxMessages: { [key: string]: Message } = {}; // Define a variable to store inbox messages
  inboxMessagesLength: number = 0; // Variable to store the length of inbox messages
  selectedMessage: Message | null = null; // Variable to store the selected message

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(state => state.auth.loggedIn))
      .subscribe(loginState => {
        if (!loginState) {
          this.router.navigate(['/']);
        } else {
          this.loadInboxMessages();
        }
      });
  }

  loadInboxMessages() {
    // Assuming you have the email stored somewhere, let's say in localStorage
    let email = localStorage.getItem('email');

    if (email) {
      // Replace characters in email if needed
      email = email.replace(/[@.]/g, '');

      this.authService.getInboxMessages(email)
        .subscribe(
          messages => {
            this.inboxMessages = messages;
            this.inboxMessagesLength = Object.keys(messages).length; // Calculate the length
            console.log(this.inboxMessages);
          },
          error => {
            console.error('Error fetching inbox messages:', error);
          }
        );
    } else {
      console.error('Email not found.');
    }
  }

  openMessageModal(message: Message) {
    this.selectedMessage = message;
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
  }
}
