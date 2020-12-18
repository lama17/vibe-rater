import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profile_pic:string = "../../../assets/unknown.jpg";

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.aboutMe().then(data => {
      this.profile_pic = data.imageURL;
    });
  }

  open_menu() {
    console.log('hi')
    document.getElementById("overlay").style.display="flex";

  }

  close_menu() {
    document.getElementById("overlay").style.display="none";
  
  }
  

}
