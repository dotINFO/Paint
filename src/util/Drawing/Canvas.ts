import * as $ from 'jquery';
import { Point, EDrawingTool, IDrawingTool, ITool, ToolContainer, ETool, Color, CircularQueue, conf } from './drawing';

export class Canvas {
    private htmlCanvas: HTMLCanvasElement;
    private volatileCanvas: HTMLCanvasElement;
    private options;
    /** flag: true -> there is a drawing going on right now */
    private isDrawing = false;
    /** flag: true -> some drawing tool is active, false otherwise */
    private isDrawingMode = false;
    /** Current active tool */
    private tool: ITool;
    /** Current active drawing tool */
    private drawingTool: IDrawingTool;
    private toolContainer: ToolContainer;


    private _undoList = new CircularQueue<ImageData>(conf["undo-list.size"]);
    private _redoList = new CircularQueue<ImageData>(conf["redo-list.size"]);

    /** width if the HTML Canvas */
    private _width: number;
    /** height if the HTML Canvas */
    private _height: number;
    /** size of current drawing tool */
    private _drawingToolSize = 1;
    /** color of current drawing tool */
    private _drawingToolColor = Color.Black;

    /**
     *  width if the HTML Canvas
     * 
     * @readonly
     */
    public get width() {
        return this._width;
    }
    /**
     * height if the HTML Canvas
     * 
     * @readonly
     */
    public get height() {
        return this._height;
    }
    /**
     * size of current drawing tool
     * 
     * @readonly
     */
    public get drawingToolSize() {
        return this._drawingToolSize;
    }
    /**
     * set size of drawing tools
     * 
     * @param size new size
     */
    public set drawingToolSize(size: number) {
        this._drawingToolSize = size;
    }
    /**
     * get color of current drawing tool
     * 
     * @readonly
     */
    public get drawingToolColor(): Color {
        return this._drawingToolColor
    }
    /**
     * set color of current drawing tool
     * 
     * @param color new color to use
     */
    public set drawingToolColor(color: Color) {
        this._drawingToolColor = color;
    }

    /** 
     * Check if there is saved work to undo
    */
    public get canUndo() {
        return this._undoList.size > 0;
    }

    /** 
     * Check if there is saved work to redo
    */
    public get canRedo() {
        return this._redoList.size
    }

    /**
     * Creates an instance of Canvas.
     * 
     * @param {HTMLCanvasElement} el
     * @param {{ [optId: string]: any }} [options]
     */
    constructor(htmlCanvas: HTMLCanvasElement, volatileCanvas: HTMLCanvasElement, options?: { [optId: string]: any }) {
        this.htmlCanvas = htmlCanvas;
        this.volatileCanvas = volatileCanvas;
        this.options = options || {};
        this.newDrawing(htmlCanvas.width, htmlCanvas.height);
        this.initialize();
    }

    private initialize() {
        this._width = this.htmlCanvas.width
        this._height = this.htmlCanvas.height;
        this.toolContainer = new ToolContainer(this);
        this.initializeHandlers();
    }

    private initializeHandlers() {
        $(this.volatileCanvas).mousedown(this.onMouseDown.bind(this));
        $(this.volatileCanvas).mousemove(this.onMouseMove.bind(this));
        $(this.volatileCanvas).mouseup(this.onMouseUp.bind(this));
        $(this.volatileCanvas).click(this.onClick.bind(this));

        $(document).mousemove(this.onMouseMove.bind(this));
        $(document).mouseup(this.onMouseUp.bind(this));
    }

    private onMouseDown(evt: JQueryMouseEventObject) {
        if (this.isDrawingMode) {
            this.isDrawing = true;
            this.drawingTool.startDrawing(this.getCanvasPosition(evt.pageX, evt.pageY));
        }
    }
    private onMouseMove(evt: JQueryMouseEventObject) {
        if (this.isDrawingMode && this.isDrawing) {
            this.drawingTool.draw(this.getCanvasPosition(evt.pageX, evt.pageY));
        }

    }

    private onMouseUp(evt: JQueryMouseEventObject) {
        if (this.isDrawingMode && this.isDrawing) {
            this.drawingTool.stopDrawing(this.getCanvasPosition(evt.pageX, evt.pageY));
            this.addUndo();
            this.drawingTool.finalize();
            this.clearVolatile();
            this.isDrawing = false;
        }
    }

    private onClick(evt: JQueryMouseEventObject) {
        if (!this.isDrawingMode && this.tool)
            this.tool.apply(new Point(evt.offsetX, evt.offsetY));
    }

    /**
     * Convert absolute position on page into relative position on canvas
     */
    private getCanvasPosition(absoluteX, absoluteY) {
        return new Point(absoluteX - this.htmlCanvas.offsetLeft, absoluteY - this.htmlCanvas.offsetTop);
    }

    private clearVolatile() {
        this.getContext().volatile.clearRect(0, 0, this.width, this.height);
    }

    private addUndo() {
        this._undoList.push(this.getContext().base.getImageData(0, 0, this._width, this._height));

    }

    /**
     * Set the canvas in drawing mode, using dt as drawing tool
     * 
     * @param {EDrawingTool} drawingTool the drawing tool to draw with
     * @return {Canvas} this
     */
    public enterDrawingMode(drawingTool: EDrawingTool | string) {
        this.isDrawingMode = true;
        this.drawingTool = this.toolContainer.getDrawingTool(drawingTool);
        return this;
    }

    public enterToolMode(tool: ETool | string) {
        this.tool = this.toolContainer.getTool(tool);
        return this;
    }

    /**
     *  Set the canvas out of drawing mode 
     */
    public exitDrawingMode() {
        this.isDrawingMode = false;
        this.isDrawing = false;
        return this;
    }

    /**
     * Gets the RenderingContext for HTML Canvas
     * 
     * @returns {CanvasRenderingContext2D}
     */
    public getContext(): { base: CanvasRenderingContext2D, volatile: CanvasRenderingContext2D } {
        return {
            base: this.htmlCanvas.getContext('2d'),
            volatile: this.volatileCanvas.getContext('2d')
        };
    }

    public newDrawing(width: number, height: number) {
        let context = this.getContext().base;
        this.htmlCanvas.width = this.volatileCanvas.width = width;
        this.htmlCanvas.height = this.volatileCanvas.height = height;
        context.fillStyle = "white";
        context.fillRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
    }

    public fromImage(img: HTMLImageElement) {
        let newWidth = img.width,
            newHeight = img.height,
            context = this.getContext().base;

        this.newDrawing(newWidth, newHeight);
        context.drawImage(img, 0, 0, newWidth, newHeight);
    }

    public getImageDataURL(format: string) {
        return this.htmlCanvas.toDataURL(format);
    }

    public undo() {
        let actualImage = this.getContext().base.getImageData(0, 0, this.width, this.height);
        this._redoList.push(actualImage);
        this.getContext().base.putImageData(this._undoList.pop(), 0, 0);
    }

    public redo() {
        let actualImage = this.getContext().base.getImageData(0, 0, this.width, this.height);
        this._undoList.push(actualImage);
        this.getContext().base.putImageData(this._redoList.pop(), 0, 0);
    }
}