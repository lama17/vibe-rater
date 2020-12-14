import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CompareComponent } from './pages/compare/compare.component';
import { BuildPlaylistComponent } from './pages/build-playlist/build-playlist.component';
import { RatePlaylistComponent } from './pages/rate-playlist/rate-playlist.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
	{ path: 'artist/:id', component: ArtistPageComponent},
	{ path: 'track/:id', component: TrackPageComponent},
	{ path: 'album/:id', component: AlbumPageComponent},
	{ path: 'home', component: HomePageComponent},
	{ path: 'search', component: SearchComponent},
	{ path: 'about', component: AboutComponent},
	{ path: 'compare', component: CompareComponent},
	{ path: 'build-playlist', component: BuildPlaylistComponent},
	{ path: 'rate-playlist', component: RatePlaylistComponent},
	{ path: '', component: SignInPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
