import { Canvas, IDrawingTool, Point } from '../drawing';

export class EllipseTool extends IDrawingTool {
    private _startingPoint: Point;
    private _endingPoint: Point;

    constructor(canvas: Canvas) {
        super(canvas);
    }

    public startDrawing(point: Point) {
        this._startingPoint = point;
    }

    public draw(point: Point) {
        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEllipse(this.context.volatile, point);
    }

    public stopDrawing(point: Point) {
        this._endingPoint = point;
        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEllipse(this.context.volatile, point);
    }

    public finalize() {
        this.drawEllipse(this.context.base, this._endingPoint);
        this._startingPoint = this._endingPoint = null;
    }

    private drawEllipse(context: CanvasRenderingContext2D, endingPoint: Point) {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            midPoint = this._startingPoint.midPointTo(endingPoint),
            width = Math.abs(midPoint.X - startX),
            height = Math.abs(midPoint.Y - startY);

        context.lineWidth = this.canvas.drawingToolSize;
        context.strokeStyle = this.canvas.drawingToolColor.HexString;
        context.beginPath();
        context.ellipse(midPoint.X, midPoint.Y, width, height, 0, 2 * Math.PI, 0);
        context.closePath();
        context.stroke();
    }
}