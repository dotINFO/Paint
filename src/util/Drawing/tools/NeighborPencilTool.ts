import { Canvas, IDrawingTool, Point } from '../drawing';

export class NeighborPencilTool extends IDrawingTool {
    private points: Point[] = [];
    private _minDistance = 50;
    private _conjunctionFactor = 0.02;

    constructor(canvas: Canvas) {
        super(canvas);
    }

    public startDrawing(point: Point) {
        this.reset();
        this.addPoint(point);
    }

    public draw(point: Point) {
        this.addPoint(point);

        this.drawLine(this.context.volatile, this.points.length - 1);
    }

    public stopDrawing(point: Point) {
        this.addPoint(point);
        this.drawLine(this.context.volatile, this.points.length - 1);
    }

    public finalize() {
        for (let i = 1; i < this.points.length; ++i)
            this.drawLine(this.context.base, i);
    }

    private drawLine(context: CanvasRenderingContext2D, pointIndex: number) {
        context.lineWidth = this.canvas.drawingToolSize;
        context.lineJoin = context.lineCap = 'round';
        context.strokeStyle = this.canvas.drawingToolColor.RGBAString;
        context.beginPath();
        context.moveTo(this.points[pointIndex - 1].X, this.points[pointIndex - 1].Y);
        context.lineTo(this.points[pointIndex].X, this.points[pointIndex].Y);
        context.stroke();

        for (var i = 0; i < pointIndex; i++) {
            let distance = this.points[i].distanceTo(this.points[pointIndex]);

            if (distance < this._minDistance) {
                context.beginPath();
                context.strokeStyle = this.canvas.drawingToolColor.getRGBAString(0.06);

                let pt1 = Point.fromPoint(this.points[pointIndex]).moveBy(distance * this._conjunctionFactor, distance * this._conjunctionFactor),
                    pt2 = Point.fromPoint(this.points[i]).moveBy(-distance * this._conjunctionFactor, -distance * this._conjunctionFactor);

                context.moveTo(pt1.X, pt1.Y);
                context.lineTo(pt2.X, pt2.Y);
                context.stroke();
            }
        }
    }

    private reset() {
        this.points.length = 0;
    }

    private addPoint(point: Point) {
        this.points.push(point);
    }
}