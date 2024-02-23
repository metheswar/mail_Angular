import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeL42XXUml5YyxL1Dp821BvKPeIzC0I2A';
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeL42XXUml5YyxL1Dp821BvKPeIzC0I2A';
  private MessageUrl = 'https://mail-angular-srm-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  signin(email: string, password: string): Observable<any> {
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post(this.signInUrl, payload);
  }

  signup(email: string, password: string): Observable<any> {
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post(this.signUpUrl, payload);
  }

  postMessage(message: any,toAddress:string,): Observable<any> {
    
    return this.http.post(`${this.MessageUrl}/${toAddress}/inbox.json`, message);
  }
  postSentMessage(message: any,FromAddress:string,): Observable<any> {
    
    return this.http.post(`${this.MessageUrl}/${FromAddress}/sent.json`, message);
  }
  getInboxMessages(mail:string):Observable<any>{
    return this.http.get(`${this.MessageUrl}/${mail}/inbox.json`);
  }
  getSentMessages(mail:string):Observable<any>{
    return this.http.get(`${this.MessageUrl}/${mail}/sent.json`);
  }

}
