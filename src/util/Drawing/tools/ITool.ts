import { Canvas } from '../Canvas';
import { Point } from '../Point';

export abstract class ITool {
    protected canvas: Canvas;
    protected context: CanvasRenderingContext2D;
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext();
    }

    apply(point: Point) { };
}