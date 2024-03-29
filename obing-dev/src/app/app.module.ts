import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { BingoLineComponent } from './components/create-bingo/bingo-line/bingo-line.component';
import { BingoTileComponent } from './components/create-bingo/bingo-line/bingo-tile/bingo-tile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BingoTitleDialogComponent } from './components/create-bingo/bingo-title-dialog/bingo-title-dialog.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './@shared/services/auth/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnlineStateService } from './@shared/services/online-state/online-state.service';
import { BingoListComponent } from './components/bingo-list/bingo-list.component';
import { BingoCardComponent } from './components/bingo-card/bingo-card.component';
import { BingoPlayComponent } from './components/bingo-play/bingo-play.component';
import { HeaderProfileComponent } from './components/header/header-end/header-profile/header-profile.component';
import { BingoNotConnectedDialogComponent } from './components/create-bingo/bingo-not-connected-dialog/bingo-not-connected-dialog.component';
import { BingoSaveLogInComponent } from './components/create-bingo/bingo-not-connected-dialog/bingo-save-log-in/bingo-save-log-in.component';
import { HeaderConnectComponent } from './components/header/header-end/header-connect/header-connect.component';
import { TileDisplayComponent } from './components/tile-display/tile-display.component';
import { HeaderEndComponent } from './components/header/header-end/header-end.component';
import { UserCardComponent } from './components/user-search/user-card/user-card.component';
import { UserFriendsListComponent } from './components/user/user-friends-list/user-friends-list.component';
import { FriendCardComponent } from './components/user/user-friends-list/friend-card/friend-card.component';
import { LocalBingoListComponent } from './components/local-bingo-list/local-bingo-list.component';
import { BingoLocalCardComponent } from './components/bingo-local-card/bingo-local-card.component';

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
    BingoLineComponent,
    BingoTileComponent,
    BingoTitleDialogComponent,
    ForgotPasswordComponent,
    BingoListComponent,
    BingoCardComponent,
    BingoPlayComponent,
    HeaderProfileComponent,
    BingoNotConnectedDialogComponent,
    BingoSaveLogInComponent,
    HeaderConnectComponent,
    TileDisplayComponent,
    HeaderEndComponent,
    UserCardComponent,
    UserFriendsListComponent,
    FriendCardComponent,
    LocalBingoListComponent,
    BingoLocalCardComponent
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthService,
    OnlineStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
