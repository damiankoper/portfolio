import { Vector3 } from 'three';
import { PathPipeSegmentType } from './PathPipe.interface';

const width = 0.5;
export const pathPipe = [
  {
    type: 'cup',
    start: new Vector3(0, 5, 0),
    width,
    pathPoint: new Vector3(4, 3, 0),
    excludeScroll: true,
  },
  {
    type: 'line',
    start: new Vector3(0, 5, 0),
    pathPoint: new Vector3(4, 5, 0),
    width,
    end: new Vector3(0, 2, 0),
    excludeScroll: true,
  },
  {
    type: 'line',
    start: new Vector3(0, 2, 0),
    pathPoint: new Vector3(4, 2, 0),
    width,
    end: new Vector3(0, 0, 0),
  },
  {
    type: 'arc',
    start: new Vector3(0, 0, 0),
    pathPoint: new Vector3(4, 0, 0),
    width,
    radius: 2,
    variant: 'top-right',
  },
  {
    type: 'arc',
    start: new Vector3(2, -2, 0),
    pathPoint: new Vector3(4, -2, 0),
    width,
    radius: 2,
    variant: 'left-bottom',
  },
  {
    type: 'line',
    start: new Vector3(4, -4, 0),
    pathPoint: new Vector3(4, -4, 0),
    width,
    end: new Vector3(4, -10, 0),
  },
  {
    type: 'cup',
    start: new Vector3(4, -10, 0),
    width,
    pathPoint: new Vector3(4, -10, 0),
  },
] satisfies PathPipeSegmentType[];
