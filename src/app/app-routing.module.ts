import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'compose',component:ComposeComponent},
  {path:'inbox',component:InboxComponent},
  {path:'sent',component:SentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
