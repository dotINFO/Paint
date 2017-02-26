import { Canvas, IDrawingTool, Point } from '../drawing';

export class NeighborPencilTool extends IDrawingTool {
    private points: Point[] = [];

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
        context.lineWidth = 1;
        context.lineJoin = context.lineCap = 'round';
        context.strokeStyle = this.canvas.drawingToolColor.RGBAString;
        context.beginPath();
        context.moveTo(this.points[pointIndex - 1].X, this.points[pointIndex - 1].Y);
        context.lineTo(this.points[pointIndex].X, this.points[pointIndex].Y);
        context.stroke();

        for (var i = 0; i < pointIndex; i++) {
            let dx = this.points[i].X - this.points[pointIndex].X,
                dy = this.points[i].Y - this.points[pointIndex].Y,
                d = dx * dx + dy * dy;

            if (d < 1000) {
                context.beginPath();

                context.strokeStyle = this.canvas.drawingToolColor.getRGBAString(0.06);
                context.moveTo(this.points[pointIndex].X + (dx * 0.2), this.points[pointIndex].Y + (dy * 0.2));
                context.lineTo(this.points[i].X - (dx * 0.2), this.points[i].Y - (dy * 0.2));
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