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
import { ListComponent } from './components/library-list/list.component';
import { CommunityComponent } from './components/community/community.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { DietComponent } from './components/diet/diet.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MediaDisplayComponent } from './components/media-display/media-display.component';
import { ShareDialogoxComponent } from './components/share-dialogox/share-dialogox.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { DeleteDialogboxComponent } from './components/delete-dialogbox/delete-dialogbox.component';
import { ViewComponent } from './components/view/view.component';
import { FavComponent } from './components/fav/fav.component';
import { FavListComponent } from './components/fav-list/fav-list.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    CardComponent,
    PaginatorComponent,
    WorkoutComponent,
    DietComponent,
    AddPostComponent,
    MediaDisplayComponent,
    ShareDialogoxComponent,
    DeleteDialogboxComponent,
    ViewComponent,
    FavComponent,
    FavListComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    ShareButtonsModule,
    ShareIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
