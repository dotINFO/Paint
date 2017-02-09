import { Point } from '../Point';
import { IAbstractTool } from '../other-tools/IAbstractTool';

//  extends IAbstractTool doesn't seem to be useful up to now
export interface IAbstractDrawingTool {
    startDrawing(context: CanvasRenderingContext2D, point: Point);
    draw(context: CanvasRenderingContext2D, point: Point);
    stopDrawing(context: CanvasRenderingContext2D, point: Point);
}
