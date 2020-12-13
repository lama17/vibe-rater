import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPlaylistComponent } from './build-playlist.component';

describe('BuildPlaylistComponent', () => {
  let component: BuildPlaylistComponent;
  let fixture: ComponentFixture<BuildPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
