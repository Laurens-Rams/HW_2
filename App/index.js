import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Color,
  AmbientLight,
  SpotLight,
  SpotLightHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import resources from './Resources';
import Stats from 'stats.js';

export default class App {
  constructor() {
    this._init();
  }

  async _init() {
    // RENDERER
    this._gl = new WebGLRenderer({
      canvas: document.querySelector('#canvas'),
    });
    this._gl.setSize(window.innerWidth, window.innerHeight);
  
    // CAMERA
    const aspect = window.innerWidth / window.innerHeight;
    this._camera = new PerspectiveCamera(50, aspect, 0.01, 1000);
    this._camera.position.set(0.4, 0.10, 0.6);
    this._camera.lookAt(0,0,0)

  
    // SCENE
    this._scene = new Scene();
  
    // CONTROLS
    this._controls = new OrbitControls(this._camera, this._gl.domElement);
    this._controls.target.set(0, 0, 0); 
  
    // STATS
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);
  
    // LOAD
    await this._load();
  
    // ANIMATE
    this._animate();
  
    // RESIZE HANDLER
    window.addEventListener('resize', this._resize.bind(this));
  }
  

  async _load() {
    await resources.load();

    // INIT SCENE
    this._initScene();

    // INIT LIGHTS
    this._initLights();
  }

  _initScene() {
    // SCENE
    this._scene.background = new Color('#e7f2f7');


    const home = resources.get('home');
    home.scene.position.y = -0.15;
    this._scene.add(home.scene);
  }

  _initLights() {
    // AMBIENT
    const al = new AmbientLight(0xededed);
    al.intensity = 0.5;
    this._scene.add(al);

    // SPOTLIGHT
    const sl = new SpotLight(0xffffff);
    sl.intensity = 5000;
    sl.position.set(25, 5, 0);
    this._scene.add(sl);

    // const slh = new SpotLightHelper(sl);
    // this._scene.add(slh);
  }

  _resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this._gl.setSize(width, height);

    const aspect = width / height;
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
  }

  _animate() {
    requestAnimationFrame(() => this._animate());

    this._controls.update(); 
    this._gl.render(this._scene, this._camera);
    this._stats.update();
  }
}
