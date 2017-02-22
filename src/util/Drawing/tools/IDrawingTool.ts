import { ITool } from './ITool';
import { Point } from '../Point';

export abstract class IDrawingTool extends ITool {
    startDrawing(point: Point) { };
    draw(point: Point) { };
    stopDrawing(point: Point) { };
    finalize() { };
}
