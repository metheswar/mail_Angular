import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComposeComponent } from './compose/compose.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ComposeComponent,
    InboxComponent,
    SentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,

    StoreModule.forRoot({ auth: authReducer }),
    HttpClientModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
