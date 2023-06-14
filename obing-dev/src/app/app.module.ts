import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreditsPageComponent } from './components/credits-page/credits-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { BingoSearchComponent } from './components/bingo-search/bingo-search.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserComponent } from './components/user/user.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateBingoComponent } from './components/create-bingo/create-bingo.component';
import { LoadBingoComponent } from './components/load-bingo/load-bingo.component';
import { RandomBingoComponent } from './components/random-bingo/random-bingo.component';
import { BingoListComponent } from './components/create-bingo/bingo-list/bingo-list.component';
import { BingoTileComponent } from './components/create-bingo/bingo-list/bingo-tile/bingo-tile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BingoTitleDialogComponent } from './components/create-bingo/bingo-title-dialog/bingo-title-dialog.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './@shared/services/auth/auth.service';
@NgModule({
  declarations: [
    AppComponent,
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
    CreateBingoComponent,
    LoadBingoComponent,
    RandomBingoComponent,
    BingoListComponent,
    BingoTileComponent,
    BingoTitleDialogComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
