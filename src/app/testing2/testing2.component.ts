import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { PerspectiveCamera, Scene } from 'three';
import { of } from 'rxjs';
import { AnimatedService } from '../service/animated.service';

import { GUI } from 'dat.gui'
@Component({
  selector: 'app-testing2',
  templateUrl: './testing2.component.html',
  styleUrls: ['./testing2.component.css']
})
export class Testing2Component implements OnInit ,
AfterViewInit {
isLabel="Start"
initial_value: number =0.01;
initAnim = true;
runAnim = false;

looping:any;
mutant:any;

isPlay = false;
theta = 0;
   @ViewChild('canvas') private canvasRef: ElementRef | undefined;
 
   //* Stage Properties
 
   @Input() public fieldOfView: number = 1;
 
   @Input('nearClipping') public nearClippingPane: number = 1;
 
   @Input('farClipping') public farClippingPane: number = 1000;
 
   //? Scene properties
   private camera: THREE.PerspectiveCamera = new PerspectiveCamera;
 
   private controls: OrbitControls | undefined;
 
   private ambientLight: THREE.AmbientLight | undefined;
 
   private light1: THREE.PointLight | undefined;
 
   private light2: THREE.PointLight | undefined;
 
   private light3: THREE.PointLight | undefined;
 
   private light4: THREE.PointLight | undefined;
 
   private model: any;
 
   private directionalLight: THREE.DirectionalLight | undefined;
 
   //? Helper Properties (Private Properties);
   constructor(private _animatedService:AnimatedService) { }
 
   private get canvas(): HTMLCanvasElement {
     return this.canvasRef?.nativeElement;
   }
 
   private loaderGLTF = new GLTFLoader();
 
   private renderer!: THREE.WebGLRenderer;
 
   private scene: THREE.Scene
   /**
    *Animate the model
    *
    * @private
    * @memberof ModelComponent
    */
   = new Scene; 
 
   private animateModel() {
     if (this.model) {
       this.model.rotation.z += 0.005;
     }
   }
   private animationActions: THREE.AnimationAction[] = []
   private mixer: THREE.AnimationMixer | undefined 

   private gui = new GUI()
   private clock = new THREE.Clock()
   private animationsFolder = this.gui.addFolder('Animations')
   private activeAction: THREE.AnimationAction     | undefined
  private modelReady = false
  private lastAction: THREE.AnimationAction | undefined
   private createControls = () => {
    //  const renderer = new CSS2DRenderer();
    const renderer = new THREE.WebGLRenderer({
      canvas:this.canvasRef?.nativeElement
    });
    //  renderer.setSize( window.innerWidth, window.innerHeight );
  
   
     document.body.appendChild( renderer.domElement ); 
     renderer.domElement.style.position = 'absolute';
     renderer.domElement.style.left = '0px';
     document.body.appendChild(renderer.domElement);
     this.controls = new OrbitControls(this.camera, renderer.domElement);
     this.controls.autoRotate = true;
     this.controls.enableZoom = true;
     this.controls.enablePan = false;
     this.controls.update();
   };

   private createScene() {
    let mixer: THREE.AnimationMixer 
  
      const array1 = [ 
        'assets/Soldierr.glb',
        'assets/Soldierr.glb', 
        'assets/Soldierr.glb'];
      this.scene = new THREE.Scene();
      this.scene.background =  new THREE.Color(0x000000)
      array1.forEach((element:any,index:number) => {
        console.log(element,'yty',index)
      
        
          this.loaderGLTF.load(
            'assets/Soldierr.glb',
  (gltf)=> {
      // gltf.scene.scale.set(.01, .01, .01)

      this.mixer = new THREE.AnimationMixer(gltf.scene)
console.log('loaded samba',gltf)
      const animationAction = this.mixer.clipAction((gltf as any).animations[0])
      this.animationActions.push(animationAction)
      this.animationsFolder.add(this.animations, 'default')
      this.activeAction = this.animationActions[0]


      this.scene.add(gltf.scene)

      //add an animation from another file
      this.loaderGLTF.load(
          'assets/Soldierr.glb',
          (gltf) => {
              console.log('loaded samba',gltf)
              const animationAction = mixer.clipAction(
                  (gltf as any).animations[0]
              )
              this.animationActions.push(animationAction)
              this.animationsFolder.add(this.animations, 'samba')

              //add an animation from another file
              this.loaderGLTF.load(
                  'assets/Soldierr.glb',
                  (gltf) => {
                      console.log('loaded bellydance')
                      const animationAction = mixer.clipAction(
                          (gltf as any).animations[0]
                      )
                      this.animationActions.push(animationAction)
                      this.animationsFolder.add(this.animations, 'bellydance')

                      //add an animation from another file
                      this.loaderGLTF.load(
                          'assets/Soldierr.glb',
                          (gltf) => {
                              console.log('loaded goofyrunning');
                              (gltf as any).animations[0].tracks.shift() //delete the specific track that moves the object forward while running
                              const animationAction = mixer.clipAction(
                                  (gltf as any).animations[0]
                              )
                              this.animationActions.push(animationAction)
                              this.animationsFolder.add(this.animations, 'goofyrunning')

                              this.modelReady = true
                          },
                          (xhr) => {
                              console.log(
                                  (xhr.loaded / xhr.total) * 100 + '% loaded'
                              )
                          },
                          (error) => {
                              console.log(error)
                          }
                      )
                  },
                  (xhr) => {
                      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                  },
                  (error) => {
                      console.log(error)
                  }
              )
          },
          (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
              console.log(error)
          }
      )
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
      console.log(error)
  }
)
      
        
      });
   


    
 
     //* Scene
  
    
   
     

     
    
   
     //*Camera
     let aspectRatio = this.getAspectRatio();
     this.camera = new THREE.PerspectiveCamera(
       this.fieldOfView,
       aspectRatio,
       this.nearClippingPane,
       this.farClippingPane
     )
     this.camera.position.x = 100;
     this.camera.position.y = 100;
     this.camera.position.z = 100;
     this.ambientLight = new THREE.AmbientLight(0x00000, 100);
     this.scene.add(this.ambientLight);
     this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
     this.directionalLight.position.set(0, 1, 0);
     this.directionalLight.castShadow = true;
     this.scene.add(this.directionalLight);
     this.light1 = new THREE.PointLight(0x4b371c, 10);
     this.light1.position.set(0, 200, 400);
     this.scene.add(this.light1);
     this.light2 = new THREE.PointLight(0x4b371c, 10);
     this.light2.position.set(500, 100, 0);
     this.scene.add(this.light2);
     this.light3 = new THREE.PointLight(0x4b371c, 10);
     this.light3.position.set(0, 100, -500);
     this.scene.add(this.light3);
     this.light4 = new THREE.PointLight(0x4b371c, 10);
     this.light4.position.set(-500, 300, 500);
     this.scene.add(this.light4);
   }
   private animations = {
    default:()=> {
        this.setAction(this.animationActions[0])
    },
    samba:  ()=> {
        this.setAction(this.animationActions[1])
    },
    bellydance:()=> {
        this.setAction(this.animationActions[2])
    },
    goofyrunning: ()=> {
        this.setAction(this.animationActions[3])
    }
}
private setAction = (toAction: THREE.AnimationAction) => {
  console.log(toAction,'toaction',toAction != this.activeAction)
  if (toAction != this.activeAction) {
      this.lastAction = this.activeAction
      this.activeAction = toAction
      //lastAction.stop()
      this.lastAction?.fadeOut(1)
      this.activeAction.reset()
      this.activeAction.fadeIn(1)
      this.activeAction.play()
  }
}
   /**
    * Create the scene
   
    */
  
 
   private getAspectRatio() {
     return this.canvas.clientWidth / this.canvas.clientHeight;
   }
 
   /**
  * Start the rendering loop
  *
  * @private
  * @memberof CubeComponent
  */
   private startRenderingLoop() {
     //* Renderer
     // Use canvas element in template
     this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
     this.renderer.setPixelRatio(devicePixelRatio);
     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
     let component: Testing2Component = this;
     function render() {
       if (component.isPlay) return;
     
       requestAnimationFrame(render);
       if (component.modelReady) component.mixer?.update(component.clock.getDelta())
       component.renderer?.render(component.scene, component.camera);
       component.theta += 0.01;
       
     };
     render()
   }
 

 
   ngOnInit(): void {
 
   }
 
   ngAfterViewInit() {
    
     this.createScene();
     this.createControls();
     this.startRenderingLoop();
 
   }
 
 

   onIncrement(val:any){
this.initial_value++

   }
   onDecrement(val:any){
 
this.initial_value--
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

     let component: Testing2Component = this;
       function render() {
 
         if (!component.isPlay) return;

         requestAnimationFrame(render);
         if (component.model) {
            component.model.rotation.z += component.initial_value
          
         }
         component.renderer.render(component.scene, component.camera);
        //  component.theta += 0.01;

         
       };
       render()
       } else {
            this.isLabel='Resume'
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
    let component:Testing2Component = this;
    function render() {
     if (component.isPlay) return;
     requestAnimationFrame(render);
     if (component.model) {
      //  console.log(component.model)
      
      component.initial_value=0.1;
       component.model.rotation.z = component.initial_value;

     }
     component.renderer.render(component.scene, component.camera);
     
      
    };
    render()
    }

}