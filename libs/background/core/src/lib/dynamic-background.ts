import * as THREE from 'three';
import { Matrix4, PointLight, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Arrow, ArrowCurve } from './shapes/arrow';

export class DynamicBackground {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private controls?: OrbitControls;

  constructor(private readonly wrapper: HTMLDivElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -wrapper.clientWidth / 100,
      wrapper.clientWidth / 100,
      wrapper.clientHeight / 100,
      -wrapper.clientHeight / 100,
      -20,
      100
    );
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    wrapper.appendChild(this.renderer.domElement);

    const arrowCurve = new ArrowCurve()
      .startFrom(new Vector3(1, 0, 0).setLength(1), new Vector3(-16, 0, 0))
      .move(20)
      .curve(Math.PI / 2, 1)
      .curve(-Math.PI / 2, 1)

      .move(20);

    const testArrow = new Arrow(arrowCurve);
    this.scene.add(testArrow.mesh);
    /*
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update(); */

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls?.update();

    this.renderer.render(this.scene, this.camera);
  }
}
