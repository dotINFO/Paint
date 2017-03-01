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

        this.drawLine(this.points.length - 1, this.context.volatile);
    }

    public stopDrawing(point: Point) {
        this.addPoint(point);
        this.drawLine(this.points.length - 1, this.context.volatile);
    }

    public finalize() {

        for (let i = 1; i < this.points.length; ++i) {
            this.drawLine(i, this.context.base);
        }
    }

    private drawLine(i: number, context: CanvasRenderingContext2D) {
        let pt1 = this.points[i - 1],
            pt2 = this.points[i],
            midPoint = pt1.midPointTo(pt2);

        context.lineWidth = this.canvas.drawingToolSize;
        context.strokeStyle = this.canvas.drawingToolColor.RGBAString;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(pt1.X, pt1.Y);
        context.quadraticCurveTo(pt1.X, pt1.Y, midPoint.X, midPoint.Y);
        context.quadraticCurveTo(midPoint.X, midPoint.Y, pt2.X, pt2.Y);
        context.stroke();
    }

    private reset() {
        this.points.length = 0;
    }

    private addPoint(point: Point) {
        this.points.push(point);
    }
}