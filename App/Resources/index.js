import { TextureLoader, VideoTexture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const ASSETS = [
  { key: 'home', type: 'gltf', path: '/house2.glb' },
];

class Resources {
  constructor() {
    this._resouces = new Map();

    this._loaders = {
      tl: new TextureLoader(),
      gltf: new GLTFLoader(),
      rgbe: new RGBELoader(),
    };
  }

  get(v) {
    return this._resouces.get(v);
  }

  async load() {
    const promises = ASSETS.map((el) => {
      let prom;
      if (el.type === 'gltf') {
        prom = new Promise((res) => {
          this._loaders.gltf.load(el.path, (model) => {
            this._resouces.set(el.key, model);
            res();
          });
        });
      }
      return prom;
    });
    await Promise.all(promises);
  }
}

const resouces = new Resources();
export default resouces;
