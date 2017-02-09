import { IAbstractDrawingTool } from './IAbstractDrawingTool';
import { Point } from '../Point';

export class PenTool implements IAbstractDrawingTool {

    Points: Point[] = [];

    startDrawing(context: CanvasRenderingContext2D, point: Point) {
        this.Points = [];

        context.lineWidth = 1;
        context.strokeStyle = '#000000';
        context.lineCap = 'round';
        context.lineJoin = 'round';

        context.beginPath();
        context.moveTo(point.X, point.Y);

        this.draw(context, point);
    }

    draw(context: CanvasRenderingContext2D, point: Point) {
        this.Points.push(point);

        console.log('drawing at ' + point.toString());
        context.lineTo(point.X, point.Y);
        context.stroke();
    }

    stopDrawing(context: CanvasRenderingContext2D, point: Point) {
        context.closePath();
    }
}
