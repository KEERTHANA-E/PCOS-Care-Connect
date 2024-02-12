import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { LibraryComponent } from './components/library/library.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { ListComponent } from './components/library-list/list.component';
import { CommunityComponent } from './components/community/community.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { CommunityListComponent } from './components/community-list/community-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recommend',
    component: RecommendComponent,
  },
  {
    path: 'content',
    component: LibraryComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'details/:id',
        component: CardDetailsComponent,
      },
    ],
  },
  {
    path: 'community',
    component: CommunityComponent,
    children: [
      {
        path: '',
        component: CommunityListComponent,
      },
      {
        path: 'details/:id',
        component: ViewDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
