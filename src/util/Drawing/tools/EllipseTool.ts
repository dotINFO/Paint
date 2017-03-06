import { Canvas, IDrawingTool, Point } from '../drawing';

export class EllipseTool extends IDrawingTool {
    private _startingPoint: Point;
    private _endingPoint: Point;
    private _imageData: ImageData;

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
            endX = endingPoint.X,
            endY = endingPoint.Y,
            center = this._startingPoint.midPointTo(endingPoint),
            xc = center.X,
            yc = center.Y,
            width = Math.round(Math.abs(endX - startX) / 2),
            height = Math.round(Math.abs(endY - startY) / 2);

        let a2 = width * width,
            b2 = height * height,
            fa2 = 4 * a2, fb2 = 4 * b2,
            x, y, sigma;

        if (width == 0 || height == 0) return;

        this._imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        /* first half */
        for (x = 0, y = height, sigma = 2 * b2 + a2 * (1 - 2 * height); b2 * x <= a2 * y; x++) {
            this._drawPixel(xc + x, yc + y);
            this._drawPixel(xc - x, yc + y);
            this._drawPixel(xc + x, yc - y);
            this._drawPixel(xc - x, yc - y);
            if (sigma >= 0) {
                sigma += fa2 * (1 - y);
                y--;
            }
            sigma += b2 * ((4 * x) + 6);
        }

        /* second half */
        for (x = width, y = 0, sigma = 2 * a2 + b2 * (1 - 2 * width); a2 * y <= b2 * x; y++) {
            this._drawPixel(xc + x, yc + y);
            this._drawPixel(xc - x, yc + y);
            this._drawPixel(xc + x, yc - y);
            this._drawPixel(xc - x, yc - y);
            if (sigma >= 0) {
                sigma += fb2 * (1 - x);
                x--;
            }
            sigma += a2 * ((4 * y) + 6);
        }

        context.putImageData(this._imageData, 0, 0);
    }

    private _drawPixel(x, y) {
        let i = (y * this._imageData.width + x) * 4;

        if (i < this._imageData.data.length) {
            this._imageData.data[i] = this.canvas.drawingToolColor.R;
            this._imageData.data[i + 1] = this.canvas.drawingToolColor.G;
            this._imageData.data[i + 2] = this.canvas.drawingToolColor.B;
            this._imageData.data[i + 3] = 255;
        }
    }

    private _drawEllipse(context: CanvasRenderingContext2D, endingPoint: Point) {
        let startX = this._startingPoint.X + 0.5,
            startY = this._startingPoint.Y + 0.5,
            midPoint = this._startingPoint.midPointTo(endingPoint),
            width = Math.abs(midPoint.X + 0.5 - startX),
            height = Math.abs(midPoint.Y + 0.5 - startY);

        context.lineWidth = this.canvas.drawingToolSize;
        context.strokeStyle = this.canvas.drawingToolColor.HexString;
        // context.save();
        // context.translate(0.5, 0.5);
        context.beginPath();
        context.ellipse(midPoint.X, midPoint.Y, width, height, 0, 2 * Math.PI, 0);
        context.closePath();
        context.stroke();
        // context.restore();
    }
}