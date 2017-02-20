declare var fabric;

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

/** Personal */
import { Canvas, Point, IDrawingTool, EDrawingTool, ETool, Color } from '../../../util/Drawing/drawing';


var drawingTools: { [id: string]: any } = {
    "PencilBrush": fabric.PencilBrush,
    "SprayBrush": fabric.SprayBrush,
    "CircleBrush": fabric.CircleBrush
}

var tools = {};

@Injectable()
export class ToolService {
    private canvas: Canvas;
    private drawingTools: { [id: string]: fabric.BaseBrush } = {}
    private fill = false;

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = new Canvas(canvas);
        this.canvas.enterDrawingMode(EDrawingTool.Pencil);
    }

    private initTools() {
        _.each(drawingTools, (drawingToolClass, drawingToolname) => {
            this.drawingTools[drawingToolname] = new drawingToolClass(this.canvas);
        });
    }


    setSize(size: number) {
        this.canvas.drawingToolSize = size;
    }

    setColor(color: Color) {
        this.canvas.drawingToolColor = color;
    }

    setDrawingTool(drawingTool: EDrawingTool | string) {
        this.canvas.enterDrawingMode(drawingTool);
    }

    setTool(tool: ETool | string) {
        this.canvas.exitDrawingMode().enterToolMode(tool);
    }

    public undo() {
        this.canvas.undo();
    }

    /**
     * reset the canvas to a new drawing
     */
    public newDrawing() {
        this.canvas.newDrawing(800, 600);
    }

    /**
     * clear the canvas and open an image as new drawing
     * 
     * @param {any} imageData
     */
    public openImage(imageData) {
        var blob = new Blob([imageData], { type: "image/png" });
        var urlCreator = window.URL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img: HTMLImageElement = new Image();
        img.onload = () => {
            this.canvas.fromImage(img);
        }
        img.src = imageUrl;
    }

    /**
     * get Canvas image as DataURL
     * 
     * @param {string} format format expected for ImageData (es. 'png', 'jpg')
     * @returns canvas the ImageDataURL
     */
    public getImage(format: string) {
        return this.canvas.getImageDataURL(format);
    }
}
