import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoSearchComponent } from './bingo-search/bingo-search.component';
import { CreditsPageComponent } from './credits-page/credits-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserComponent } from './user/user.component';

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
    path:'user',
    component:UserComponent
  },
  {
    path:'userSearch',
    component:UserSearchComponent
  },
  {
    path:'bingoSearch',
    component:BingoSearchComponent
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
