import { Canvas, IDrawingTool, Point } from '../drawing';

export class PencilTool extends IDrawingTool {
    private points: Point[] = [];

    constructor(canvas: Canvas) {
        super(canvas);
    }

    startDrawing(point: Point) {
        this.reset();
        this.addPoint(point);
        this.context.lineWidth = this.canvas.drawingToolSize;
        this.context.strokeStyle = this.canvas.drawingToolColor.HexString;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.beginPath();
    }

    draw(point: Point) {
        this.addPoint(point);
        let p1 = this.points[0],
            p2 = this.points[1];

        if (this.points.length == 2 && p1.equals(p2)) {
            p1.moveBy(-0.5, 0.5);
            this.context.moveTo(p1.X, p1.Y);
            this.context.lineTo(point.X, point.Y);
        }

        this.drawLastLine();
        this.context.stroke();
    }

    stopDrawing(point: Point) {
        this.addPoint(point);
        this.drawLastLine();
        this.context.stroke();
    }

    private drawLastLine() {
        let len = this.points.length,
            p1 = this.points[len - 2],
            midPoint = p1.midPointFrom(this.points[len - 1]),
            p2 = this.points[len - 1];

        this.context.quadraticCurveTo(p1.X, p1.Y, midPoint.X, midPoint.Y);
        this.context.quadraticCurveTo(midPoint.X, midPoint.Y, p2.X, p2.Y);
    }

    private reset() {
        this.points.length = 0;
    }

    private addPoint(point: Point) {
        this.points.push(point);
    }
}