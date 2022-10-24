import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { AnimatedgirlComponent } from './animatedgirl/animatedgirl.component';
import { ModelComponent } from './model/model.component';
import { ControlsComponent } from './controls/controls.component';
import { FormsModule } from '@angular/forms';
import { TestingComponent } from './testing/testing.component';
import { Testing2Component } from './testing2/testing2.component';
import { Testing3Component } from './testing3/testing3.component';
import { AnimationMixerComponent } from './animation-mixer/animation-mixer.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    AnimatedgirlComponent,
    ModelComponent,
    ControlsComponent,
    TestingComponent,
    Testing2Component,
    Testing3Component,
    AnimationMixerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
