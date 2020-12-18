import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CarouselCardComponent } from './components/carousel-card/carousel-card.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { AboutComponent } from './components/about/about.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ThermometerComponent } from './components/thermometer/thermometer.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CompareComponent } from './pages/compare/compare.component';
import { RatePlaylistComponent } from './pages/rate-playlist/rate-playlist.component';
import { BuildPlaylistComponent } from './pages/build-playlist/build-playlist.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CarouselCardComponent,
    ArtistPageComponent,
    AlbumPageComponent,
    TrackPageComponent,
    TrackListComponent,
    CarouselComponent,
    SearchComponent,
    HomePageComponent,
    ThermometerComponent,
    SignInPageComponent,
    CompareComponent,
    RatePlaylistComponent,
    BuildPlaylistComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
