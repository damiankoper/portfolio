import { Curve, SplineCurve, Vector2, Vector3 } from 'three';
import { PathPipeSegmentType } from './PathPipe.interface';

const width = 1;
export const pathPipe = [
  {
    type: 'cup',
    start: new Vector3(0, 5, 0),
    width,
  },
  {
    type: 'line',
    start: new Vector3(0, 5, 0),
    width,
    end: new Vector3(0, 2, 0),
  },
  {
    type: 'line',
    start: new Vector3(0, 2, 0),
    width,
    end: new Vector3(0, 0, 0),
  },
  {
    type: 'arc',
    start: new Vector3(0, 0, 0),
    width,
    radius: 2,
    variant: 'top-right',
  },
  {
    type: 'arc',
    start: new Vector3(2, -2, 0),
    width,
    radius: 2,
    variant: 'left-bottom',
  },
  {
    type: 'line',
    start: new Vector3(4, -4, 0),
    width,
    end: new Vector3(4, -10, 0),
  },
  {
    type: 'cup',
    start: new Vector3(4, -10, 0),
    width,
  },
] satisfies PathPipeSegmentType[];

export const camPath: Curve<Vector2> = new SplineCurve([
  new Vector2(6, 2.5),
  new Vector2(6, -1),
  new Vector2(4, -8),
  new Vector2(4, -15),
]);
