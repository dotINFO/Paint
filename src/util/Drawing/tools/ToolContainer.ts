import { Canvas, EDrawingTool, ETool, IDrawingTool, ITool, PencilTool, NeighborPencilTool, RectangleTool, EllipseTool, Filler } from '../drawing';

export class ToolContainer {
    private canvas: Canvas;
    private drawingTools = {};
    private tools = {};

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.initialize();
    }

    private initialize() {
        this.drawingTools[EDrawingTool.Pencil] = new PencilTool(this.canvas);
        this.drawingTools[EDrawingTool.NeighbordPencil] = new NeighborPencilTool(this.canvas);

        this.drawingTools[EDrawingTool.Rectangle] = new RectangleTool(this.canvas);
        this.drawingTools[EDrawingTool.Ellipse] = new EllipseTool(this.canvas);

        this.tools[ETool.Filler] = new Filler(this.canvas);
    }

    public getDrawingTool(dt: EDrawingTool | string): IDrawingTool {
        if (typeof dt === 'string')
            dt = EDrawingTool[dt];

        return this.drawingTools[dt];
    }

    public getTool(t: ETool | string): ITool {
        if (typeof t === 'string')
            t = ETool[t];

        return this.tools[t];
    }
}