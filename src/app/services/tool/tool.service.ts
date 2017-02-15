declare var fabric;

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

/** Personal */
import { Point } from '../../../util/Point';
import { IAbstractTool } from '../../../util/other-tools/IAbstractTool';
import { IAbstractDrawingTool } from '../../../util/drawing-tools/IAbstractDrawingTool';
import { PenTool } from '../../../util/drawing-tools/PenTool';


var drawingTools = {
    'PenTool': PenTool
};

var tools = {};

@Injectable()
export class ToolService {
    // private drawing = false;
    // private activeToolName: string = 'PenTool';
    // private activeDrawingTools: { [id: string]: IAbstractDrawingTool } = {};
    // private activeTools: { [id: string]: IAbstractTool } = {};
    // private context: CanvasRenderingContext2D;
    private canvas: fabric.Canvas;

    // private get ActiveTool(): IAbstractDrawingTool {
    //     return this.activeDrawingTools[this.activeToolName];
    // }

    constructor() {
        // this.initTools();
    }

    setDrawingPen() {
        this.canvas.isDrawingMode = true;
        (<any>this.canvas).freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    }

    setSprayBrush() {
        this.canvas.isDrawingMode = true;
        (<any>this.canvas).freeDrawingBrush = new fabric.SprayBrush(this.canvas);
    }

    setCircleBrush() {
        this.canvas.isDrawingMode = true;
        (<any>this.canvas).freeDrawingBrush = new fabric.CircleBrush(this.canvas);
    }

    setSize(size: number) {
        (<any>this.canvas).freeDrawingBrush.width = size;;
    }

    setColor(color: string) {
        (<any>this.canvas).freeDrawingBrush.color = color;
    }

    setSelectMode() {
        this.canvas.isDrawingMode = false;
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        let c = new fabric.Canvas(canvas);
        c.isDrawingMode = true;
        (<any>c).freeDrawingBrush = new fabric.PencilBrush(c);

        this.canvas = c;
    }

    openImage(imageData) {
        var blob = new Blob([imageData], { type: "image/png" });
        var urlCreator = window.URL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img: HTMLImageElement = new Image();
        img.onload = () => {
            this.canvas.add(new fabric.Image(img));
        }
        img.src = imageUrl;
    }

    getImage() {
        return this.canvas.toDataURL();
    }

    /**
     * Registers a tool as a working tool, meaning it will receive events
     */
    // public registerAsTool(toolName: string, tool: IAbstractTool): boolean {
    //     if (_.isNil(this.activeTools[toolName])) {
    //         this.activeTools[toolName] = tool;
    //         return true;
    //     }

    //     return false;
    // }



    // public setContext(context: CanvasRenderingContext2D) {
    //     this.context = context;
    // }


    // /** -Events- */
    // public triggerClick(point: Point) {
    //     _.forEach(this.activeTools, (tool) => {
    //         tool.paperClick(point);
    //     });
    // }

    // public triggerMouseEnter(point: Point) {
    //     _.forEach(this.activeTools, (tool) => {
    //         tool.paperMouseEnter(point);
    //     });
    // }
    // public triggerMouseLeave(point: Point) {
    //     _.forEach(this.activeTools, (tool) => {
    //         tool.paperMouseLeave(point);
    //     });
    // }

    // public triggerMouseMove(point: Point) {
    //     _.forEach(this.activeTools, (tool) => {
    //         tool.paperMouseMove(point);
    //     });
    // }

    // public triggerStartDrawing(point: Point) {
    //     this.drawing = true;
    //     this.ActiveTool.startDrawing(this.context, point);
    // }

    // public triggerDraw(point: Point) {
    //     if (this.drawing) {
    //         this.ActiveTool.draw(this.context, point);
    //     }
    // }

    // public triggerStopDrawing(point: Point) {
    //     this.drawing = false;
    //     this.ActiveTool.stopDrawing(this.context, point);
    // }
    // /** -/- */

    // private initTools(): void {
    //     // _.forEach(tools, (tool, toolName) => {
    //     //     this.activeTools[toolName] = new tool();
    //     // });


    //     _.forEach(drawingTools, (tool, drawingToolName) => {
    //         this.activeDrawingTools[drawingToolName] = new tool();
    //     });

    // }
}
