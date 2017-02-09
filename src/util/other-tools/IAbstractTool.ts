import { Point } from '../Point';

export interface IAbstractTool {
    paperClick(point: Point);
    paperMouseEnter(point: Point);
    paperMouseMove(point: Point);
    paperMouseLeave(point: Point);
}
