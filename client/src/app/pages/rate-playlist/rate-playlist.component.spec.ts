import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePlaylistComponent } from './rate-playlist.component';

describe('RatePlaylistComponent', () => {
  let component: RatePlaylistComponent;
  let fixture: ComponentFixture<RatePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
