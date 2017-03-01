import { Canvas, IDrawingTool, Point } from '../drawing';

export class RectangleTool extends IDrawingTool {
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
        this.drawRectangle(this.context.volatile, point);
    }

    public stopDrawing(point: Point) {
        this._endingPoint = point;
        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRectangle(this.context.volatile, point);
    }

    public finalize() {
        this.drawRectangle(this.context.base, this._endingPoint);
        this._startingPoint = this._endingPoint = null;
    }

    private drawRectangle(context: CanvasRenderingContext2D, endingPoint: Point) {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            width = endingPoint.X - startX,
            height = endingPoint.Y - startY;

        context.lineWidth = this.canvas.drawingToolSize;
        context.strokeStyle = this.canvas.drawingToolColor.HexString;
        context.beginPath();
        context.rect(startX, startY, width, height);
        context.closePath();
        context.stroke();
    }
}