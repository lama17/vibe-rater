import { Component, Input, OnInit } from '@angular/core';
import { TrackFeature } from 'src/app/data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() feature:TrackFeature;
 


  constructor() { }

  ngOnInit() {
  }

}
