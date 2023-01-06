import * as THREE from 'three';
import { Euler, Quaternion, Vector3 } from 'three';

interface ArrowCurveStep {
  getDistance(): number;
  transform(t: number, direction: Vector3, point: Vector3): void;
}

class LineStep implements ArrowCurveStep {
  constructor(private readonly distance: number) {}
  getDistance(): number {
    return this.distance;
  }
  transform(t: number, direction: Vector3, point: Vector3): void {
    point.add(direction.clone().multiplyScalar(this.distance * t));
  }
}

class CurveStep implements ArrowCurveStep {
  constructor(
    private readonly angle: number,
    private readonly radius: number
  ) {}
  getDistance(): number {
    return this.radius * Math.abs(this.angle);
  }
  transform(t: number, direction: Vector3, point: Vector3): void {
    const rDir = new Vector3()
      .copy(direction)
      .applyEuler(new Euler(0, 0, (Math.sign(this.angle) * Math.PI) / 2))
      .multiplyScalar(this.radius);
    const rDirRotated = rDir
      .clone()
      .applyEuler(new Euler(0, 0, this.angle * t));

    direction.applyEuler(new Euler(0, 0, this.angle * t));

    point.add(rDir).sub(rDirRotated);
  }
}

export class ArrowCurve extends THREE.Curve<Vector3> {
  private startPoint = new Vector3();
  private startDirection = new Vector3();
  private steps: ArrowCurveStep[] = [];

  override getPoint(t: number, target = new THREE.Vector3()) {
    const totalDistance = this.steps.reduce(
      (d, step) => d + step.getDistance(),
      0
    );

    let distanceLeft = totalDistance * t;
    const direction = this.startDirection.clone();
    const point = this.startPoint.clone();

    for (const step of this.steps) {
      const stepDistance = step.getDistance();
      const tStep = Math.min(distanceLeft / stepDistance, 1) || 0;
      step.transform(tStep, direction, point);

      distanceLeft -= step.getDistance();
      if (distanceLeft <= 0) break;
    }

    return target.copy(point);
  }

  startFrom(direction = new Vector3(), point = new Vector3()) {
    this.startPoint = point;
    this.startDirection = direction;
    return this;
  }
  move(distance: number) {
    this.steps.push(new LineStep(distance));
    return this;
  }
  curve(angle: number, radius: number) {
    this.steps.push(new CurveStep(angle, radius));
    return this;
  }
}

export class Arrow {
  public mesh: THREE.Mesh;
  constructor(curve: ArrowCurve = new ArrowCurve()) {
    const geometry = new THREE.TubeGeometry(curve, 240, 0.2, 120, false);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.mesh = new THREE.Mesh(geometry, material);
  }
}
