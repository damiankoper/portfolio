import { Vector3 } from 'three';

export type PathPipeSegmentType =
  | PathPipeCupSegment
  | PathPipeLineSegment
  | PathPipeArcSegment;

interface PathPipeSegment {
  type: string;
  start: Vector3;
  pathPoint?: Vector3;
  width: number;
  excludeScroll?: boolean;
}

export interface PathPipeCupSegment extends PathPipeSegment {
  type: 'cup';
}

export interface PathPipeLineSegment extends PathPipeSegment {
  type: 'line';
  end: Vector3;
}
export interface PathPipeArcSegment extends PathPipeSegment {
  type: 'arc';
  radius: number;
  variant: 'top-right' | 'top-left' | 'left-bottom' | 'right-bottom';
}
