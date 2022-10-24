import { Injectable } from '@angular/core';

import {
  AnimationMixer,
  Clock,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable()
export class SceneService {
  aspect!: number;
  camera!: PerspectiveCamera;
  container!: HTMLElement;
  controls!: OrbitControls;
  hemisphere!: HemisphereLight;
  loader!: GLTFLoader;
  mainLight!: DirectionalLight;
  scene!: Scene;

  deltaX = 0.01;
  deltaY = 0.01;
  deltaZ = 0.01;
  far = 100;
  fov = 35;
  gammaFactor = 1.2;
  gammaOutput = true;
  near = 1;
  physicallyCorrectLights = true;
  sceneBackground = '#A6A5B7';
  // 0x8fbcd4;
  renderer = new WebGLRenderer({ antialias: true });

  clock = new Clock();
  mixers = new Array<AnimationMixer>();
  parrotPosition = new Vector3(0, -3, 0);

  directionalLightOptions = {
    color:  '#ffffff00',
    intensity: 1,
  };

  hemisphereOptions = {
    skyColor: '#f5f5f5',
    groundColor: '',
    intensity: 2,
  };

  private createCamera = () => {
    this.camera = new PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
    this.camera.position.set(0, 0.2, 4.5);
  };

  private createControls = () =>
    (this.controls = new OrbitControls(this.camera, this.container));

  private createLight = () => {
    this.hemisphere = new HemisphereLight(
      this.hemisphereOptions.skyColor,
      this.hemisphereOptions.groundColor,
      this.hemisphereOptions.intensity
    );

    this.mainLight = new DirectionalLight(
      this.directionalLightOptions.color,
      this.directionalLightOptions.intensity
    );
    this.mainLight.position.set(0, 10, 30);

    this.scene.add(this.hemisphere, this.mainLight);
  };

  num: number = 0;
  oldMod: any;
  action: any;
  private createModels = () => {
    this.loader = new GLTFLoader();
    const loadModel = (gltf: GLTF, position: Vector3) => {

      this.scene.clear();
      this.createLight();

      const model = gltf.scene;
      // .children[0];
      try {
        model.position.copy(position);
        model.scale.set(2.02, 2.02, 2.02);

        const animation = gltf.animations[0];

        const mixer = new AnimationMixer(model);
        this.mixers.push(mixer);

        this.action = mixer.clipAction(animation);
        this.action.play();
      } catch (e) { }
      this.scene.add(model);
    };

    const userEmailArray: any = [
      'assets/SubmissionV02/Boy/SLA_ANI_G_V02_03.glb',
      // 'assets/SubmissionV02/Boy/SLA_ANI_Name_V01_04.glb',
      // 'assets/SubmissionV02/Boy/SLA_ANI_What_V01_03.glb',
      // 'assets/SubmissionV02/Boy/SLA_ANI_Who_V01_03.glb',
      // 'assets/SubmissionV02/Boy/SLA_ANI_Yes_V01_04.glb',
      // 'assets/SubmissionV02/Boy/SLA_ANI_Your_V01_03.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_G_V01_02.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_Name_V01_02.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_What_V01_02.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_Who_V01_02.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_Yes_V01_02.glb',
      // 'assets/SubmissionV02/Boy_V02/SLA_ANI_Your_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_G_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Name_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_What_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Who_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Yes_V01_02.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Your_V01_02.glb',
      // 'assets/SubmissionV02/Girl_V02/SLA_ANI_G_V01_01.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Name_V01_01.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_What_V01_01.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Who_V01_01.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Yes_V01_01.glb',
      // 'assets/SubmissionV02/Girl/SLA_ANI_Your_V01_01.glb',
    ];

    let changeText = () => {
      var timer = 0;

      // Use let instead of var
      for (let i = 0; i < userEmailArray.length; i++) {
        setTimeout(() => {

          this.loader.load(
            userEmailArray[i],
            (gltf) => {
              loadModel(gltf, this.parrotPosition);
            },
            () => { },
            (err) => console.log(err)
          );
        }, timer);

        timer = timer + 2000;
      }
    };

    changeText();
  };

  private onWindowResize = () => {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer &&
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
  };

  private createRenderer = () => {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize);
  };

  // INITIALIZATION

  private update = () => {
    const delta = this.clock.getDelta();
    this.mixers.forEach((x) => x.update(delta));
  };

  private render = () => this.renderer.render(this.scene, this.camera);

  start = () =>
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.render();
    });

  stop = () => this.renderer.setAnimationLoop(null);

  initialize = (container: HTMLElement) => {
    this.container = container;
    this.scene = new Scene();
    this.scene.background = new Color(this.sceneBackground);
    this.aspect = container.clientWidth / container.clientHeight;

    this.createCamera();
    this.createControls();
    this.createLight();
    this.createModels();
    this.createRenderer();
    this.start();
  };

  actionMethod() {
    var status = localStorage.getItem('status');
    if (status == 'true') {
      this.action.paused = false;
    } else {
      this.action.paused = true;
    }
  }
}
