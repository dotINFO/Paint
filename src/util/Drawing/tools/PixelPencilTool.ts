import { Canvas, IDrawingTool, Point } from '../drawing';

export class PixelPencilTool extends IDrawingTool {
    private points: Point[] = [];

    constructor(canvas: Canvas) {
        super(canvas);
    }

    public startDrawing(point: Point) {
        this.reset();
        this.addPoint(point);
        this.context.volatile.lineWidth = this.canvas.drawingToolSize;
        this.context.volatile.strokeStyle = this.canvas.drawingToolColor.HexString;
        this.context.volatile.lineCap = 'round';
        this.context.volatile.lineJoin = 'round';
        this.context.volatile.beginPath();
    }

    public draw(point: Point) {
        this.addPoint(point);

        let p1 = this.points[0],
            p2 = this.points[1],
            length = this.points.length;

        if (this.points.length == 2 && p1.equals(p2)) {
            p1.moveBy(-0.5, 0.5);
        }

        this.drawLine(this.points[length - 2], this.points[length - 1], this.context.volatile);
        this.context.volatile.stroke();
    }

    public stopDrawing(point: Point) {
        this.addPoint(point);
        let length = this.points.length;
        this.drawLine(this.points[length - 2], this.points[length - 1], this.context.volatile);
        this.context.volatile.stroke();
    }

    public finalize() {
        this.context.base.lineWidth = this.canvas.drawingToolSize;
        this.context.base.strokeStyle = this.canvas.drawingToolColor.HexString;
        this.context.base.lineCap = 'round';
        this.context.base.lineJoin = 'round';
        this.context.base.beginPath();

        for (var i = 0; i < this.points.length - 2; ++i) {
            this.drawLine(this.points[i], this.points[i + 1], this.context.base)
            this.context.base.stroke();
        }
    }

    private drawLine(p1: Point, p2: Point, context: CanvasRenderingContext2D) {
        let len = this.points.length,
            midPoint = p1.midPointFrom(p2);

        context.quadraticCurveTo(p1.X, p1.Y, midPoint.X, midPoint.Y);
        context.quadraticCurveTo(midPoint.X, midPoint.Y, p2.X, p2.Y);
    }

    private reset() {
        this.points.length = 0;
    }

    private addPoint(point: Point) {
        this.points.push(point);
    }
}