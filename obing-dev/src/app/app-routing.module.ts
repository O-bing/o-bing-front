import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoSearchComponent } from './components/bingo-search/bingo-search.component';
import { CreateBingoComponent } from './components/create-bingo/create-bingo.component';
import { CreditsPageComponent } from './components/credits-page/credits-page.component';
import { LoadBingoComponent } from './components/load-bingo/load-bingo.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserComponent } from './components/user/user.component';
import { RandomBingoComponent } from './components/random-bingo/random-bingo.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { BingoUserListComponent } from './components/bingo-user-list/bingo-user-list.component';
import { BingoCardComponent } from './components/bingo-user-list/bingo-card/bingo-card.component';

const routes: Routes = [
  {
    path:'',
    component:MainPageComponent
  },
  {
    path:'home',
    component:MainPageComponent
  },
  {
    path:'newBingo',
    component:CreateBingoComponent
  },
  {
    path:'loadBingo',
    component:LoadBingoComponent
  },
  {
    path:'searchBingo',
    component:BingoSearchComponent
  },
  {
    path:'randomBingo',
    component:RandomBingoComponent
  },
  {
    path:'bingoUserList',
    component:BingoUserListComponent
  },
  {
    path:'bingoCard/:bingoId',
    component:BingoCardComponent},
  {
    path:'user/:userId',
    component:UserComponent
  },
  {
    path:'searchUser',
    component:UserSearchComponent
  },
  {
    path:'logIn',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'credits',
    component:CreditsPageComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
