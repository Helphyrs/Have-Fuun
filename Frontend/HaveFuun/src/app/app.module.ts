import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './Component/Auth/login/login.component';
import { SignupComponent } from './Component/Auth/sign-up/sign-up.component';
import { HeaderComponent } from './Component/Shared/header/header.component';
import { FooterComponent } from './Component/Shared/footer/footer.component';
import { AuthInterceptor } from './Services/Interceptor/auth.interceptor';
import { HomeComponent } from './Component/Home/home.component';
import { AdminComponent } from './Component/Admin/admin/admin.component';
import { AdminCommentFromUserComponent } from './Component/Admin/admin-comment-from-user/admin-comment-from-user.component';
import { AdminFormsComponent } from './Component/Admin/admin-forms/admin-forms.component';
import { AdminArticlesComponent } from './Component/Admin/admin-articles/admin-articles.component';
import { LegalNoticeComponent } from './Component/Mandatory/legal-notice/legal-notice.component';
import { ContactUsComponent } from './Component/Mandatory/contact-us/contact-us.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminCommentFromUserComponent,
    AdminFormsComponent,
    AdminArticlesComponent,
    LegalNoticeComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
