import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { LibraryComponent } from './components/library/library.component';
import { AboutComponent } from './components/about/about.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { ListComponent } from './components/list/list.component';
import { CommunityComponent } from './components/community/community.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    RecommendComponent,
    LibraryComponent,
    AboutComponent,
    CardDetailsComponent,
    ListComponent,
    CommunityComponent,
    ViewDetailsComponent,
    CommunityListComponent,
    CarouselComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
