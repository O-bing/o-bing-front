import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponentComponent } from './main-page-component/main-page-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { UserSearchComponentComponent } from './user-search-component/user-search-component.component';
import { BingoSearchComponentComponent } from './bingo-search-component/bingo-search-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignUpComponentComponent } from './sign-up-component/sign-up-component.component';
import { CreditsPageComponentComponent } from './credits-page-component/credits-page-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreditsPageComponent } from './credits-page/credits-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { BingoSearchComponent } from './bingo-search/bingo-search.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserComponent } from './user/user.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateBingoComponent } from './create-bingo/create-bingo.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponentComponent,
    UserComponentComponent,
    UserSearchComponentComponent,
    BingoSearchComponentComponent,
    LoginComponentComponent,
    SignUpComponentComponent,
    CreditsPageComponentComponent,
    PageNotFoundComponentComponent,
    PageNotFoundComponent,
    CreditsPageComponent,
    SignUpComponent,
    LoginComponent,
    BingoSearchComponent,
    UserSearchComponent,
    UserComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    CreateBingoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
