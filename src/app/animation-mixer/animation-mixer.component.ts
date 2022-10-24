import { Component, ViewChild, ElementRef } from '@angular/core';
import { SceneService } from '../new-service.service';

@Component({
  selector: 'app-animation-mixer',
  templateUrl: './animation-mixer.component.html',
  styleUrls: ['./animation-mixer.component.css'],
  providers: [SceneService],
})
export class AnimationMixerComponent {
  constructor(private scene: SceneService) {
    localStorage.clear();
  }

  @ViewChild('container')
  set container(container: ElementRef) {
    this.scene.initialize(container.nativeElement);
  }

  playButton() {
    localStorage.setItem('status', true.toString());
    this.scene.actionMethod();
  }

  stopButton() {
    localStorage.setItem('status', false.toString());
    this.scene.actionMethod();
  }
}
