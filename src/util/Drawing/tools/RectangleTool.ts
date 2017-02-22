import { Canvas, IDrawingTool, Point } from '../drawing';

export class RectangleTool extends IDrawingTool {
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
            startY = this._startingPoint.Y;

        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.volatile.beginPath();
        this.context.volatile.rect(startX, startY, point.X - startX, point.Y - startY);
        this.context.volatile.stroke();
    }

    public stopDrawing(point: Point) {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y;
        this._endingPoint = point;

        this.context.volatile.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.volatile.beginPath();
        this.context.volatile.rect(startX, startY, point.X - startX, point.Y - startY);
        this.context.volatile.stroke();
    }

    public finalize() {
        let startX = this._startingPoint.X,
            startY = this._startingPoint.Y,
            width = this._endingPoint.X - startX,
            height = this._endingPoint.Y - startY;

        this.context.base.lineWidth = this.canvas.drawingToolSize;
        this.context.base.strokeStyle = this.canvas.drawingToolColor.HexString;
        this.context.base.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.volatile.beginPath();
        this.context.base.rect(startX, startY, width, height);
        this.context.base.stroke();
    }
}