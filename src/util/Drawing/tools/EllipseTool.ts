import { Canvas, IDrawingTool, Point } from '../drawing';

export class EllipseTool extends IDrawingTool {
    private _startingPoint: Point;
    private _endingPoint: Point;

    constructor(canvas: Canvas) {
        super(canvas);
    }

    public startDrawing(point: Point) {
        this._startingPoint = point;
        this.context.volatile.lineWidth = this.canvas.drawingToolSize;
        this.context.volatile.strokeStyle = this.canvas.drawingToolColor.HexString;
    }

    public draw(point: Point) {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            midPoint = this._startingPoint.midPointTo(point);

        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.volatile.beginPath();
        this.context.volatile.ellipse(midPoint.X, midPoint.Y, Math.abs(midPoint.X - startX), Math.abs(midPoint.Y - startY), 0, 2 * Math.PI, 0);
        this.context.volatile.stroke();
    }

    public stopDrawing(point: Point) {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            midPoint = this._startingPoint.midPointTo(point);
        this._endingPoint = point;

        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.volatile.beginPath();
        this.context.volatile.ellipse(midPoint.X, midPoint.Y, Math.abs(midPoint.X - startX), Math.abs(midPoint.Y - startY), 0, 2 * Math.PI, 0);
        this.context.volatile.stroke();
    }

    public finalize() {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            midPoint = this._startingPoint.midPointTo(this._endingPoint);

        this.context.base.lineWidth = this.canvas.drawingToolSize;
        this.context.base.strokeStyle = this.canvas.drawingToolColor.HexString;
        this.context.base.beginPath();
        this.context.base.ellipse(midPoint.X, midPoint.Y, Math.abs(midPoint.X - startX), Math.abs(midPoint.Y - startY), 0, 2 * Math.PI, 0);
        this.context.base.stroke();
    }
}