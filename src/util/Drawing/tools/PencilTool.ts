import { Canvas, IDrawingTool, Point } from '../drawing';

export class PencilTool extends IDrawingTool {
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

        let p1 = this.points[0],
            p2 = this.points[1],
            length = this.points.length;

        if (this.points.length == 2 && p1.equals(p2)) {
            p1.moveBy(-0.5, 0.5);
        }

        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAll(this.context.volatile);
    }

    public stopDrawing(point: Point) {
        this.addPoint(point);
        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAll(this.context.volatile);
    }

    public finalize() {
        this.drawAll(this.context.base);
    }

    private drawAll(context: CanvasRenderingContext2D) {
        context.lineWidth = this.canvas.drawingToolSize;
        context.strokeStyle = this.canvas.drawingToolColor.RGBAString;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();

        for (var i = 0; i < this.points.length - 2; ++i) {
            this.drawLine(this.points[i], this.points[i + 1], context)
            context.stroke();
        }
    }

    private drawLine(p1: Point, p2: Point, context: CanvasRenderingContext2D) {
        let len = this.points.length,
            midPoint = p1.midPointTo(p2);

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