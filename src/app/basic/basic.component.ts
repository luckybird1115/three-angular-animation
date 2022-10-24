import { Input } from '@angular/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  val:any;
  isLabel="start"
  
   initAnim = true;
   runAnim = false;
   isPlay = false;
  theta = 0;
    @ViewChild('canvas')
    private canvasRef: ElementRef | undefined;
  
    //* Cube Properties
  
    @Input() public rotationSpeedX: number = 0.005;
  
    @Input() public rotationSpeedY: number = 0.01;
  
    @Input() public size: number = 200;
  
    @Input() public texture: string = "/assets/asdf.png";
  
  
    //* Stage Properties
  
    @Input() public cameraZ: number = 400;
  
    @Input() public fieldOfView: number = 1;
  
    @Input('nearClipping') public nearClippingPlane: number = 1;
  
    @Input('farClipping') public farClippingPlane: number = 1000;
  
    //? Helper Properties (Private Properties);
  
    private camera!: THREE.PerspectiveCamera;
   
  
    private get canvas(): HTMLCanvasElement {
      return this.canvasRef?.nativeElement;
    }
    private loader = new THREE.TextureLoader();
    private geometry = new THREE.BoxGeometry(2, 2, 2);
    private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture)});
  
    private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  
    private renderer!: THREE.WebGLRenderer;
  
    private scene!: THREE.Scene;
  
    private createScene() {
      //* Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000)
      this.scene.add(this.cube);
      //*Camera
    
      this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camera.position.z = 5
    }
  
   
  
    private startRenderingLoop() {
    
      //* Renderer
      // Use canvas element in template
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setPixelRatio(devicePixelRatio);
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  
      let component: BasicComponent = this;
      function render() {
        if (component.isPlay) return;
        requestAnimationFrame(render);
     
        component.renderer.render(component.scene, component.camera);
        component.theta += 0.01;
        
      };
      render()
    
    }
  
    constructor() { }
  
    ngOnInit(): void {
  
  
    }
  
    ngAfterViewInit() {
      
      this.createScene();
      
      this.startRenderingLoop();
    }
    OnStart(){
  
      if (this.initAnim) {
        this.initAnim = false;
        this.runAnim = true;
        this.theta = 0;
      }
      if (this.runAnim) { 
        this.isLabel='Pause'
        this.runAnim = false;
        this.isPlay = true;
        
      let component: BasicComponent = this;
        function render() {
          if (!component.isPlay) return;
          requestAnimationFrame(render);
          component.cube.rotation.x  += 0.01;
          component.cube.rotation.y += 0.01;
          component.renderer.render(component.scene, component.camera);
          component.theta += 0.01;
          
        };
        render()
        } else {
             this.isLabel='Restart'
              this.runAnim = true;
              this.isPlay = false;
        }
    }
    onRest(){
      this.isLabel='Start'
       // Boolean for Stop Animation
     this.initAnim = true;
     this.runAnim = false;
     this.theta = 0;
     this.isPlay = false;
     let component: BasicComponent = this;
     function render() {
      if (component.isPlay) return;
      requestAnimationFrame(render);
      component.cube.rotation.y=0;
      component.cube.rotation.x=0
      component.renderer.render(component.scene, component.camera);
      
       
     };
     render()
     }
  
    
  }
  