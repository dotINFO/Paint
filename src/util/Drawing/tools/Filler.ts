import { Canvas, ITool, Point, Color } from '../drawing';
import * as _ from 'lodash';

var LEFT = 0, RIGHT = 1, TOP = 2, BOTTOM = 3;

export class Filler extends ITool {
    private imageData: ImageData;
    private startColor = {
        R: 0,
        G: 0,
        B: 0
    };

    private fillColor = {
        R: 0,
        G: 0,
        B: 0
    };

    private options = {
        fillTolerance: 0,
        fillHack: true
    };


    constructor(canvas: Canvas, options?) {
        super(canvas);

        _.each(options, (option, optionKey) => {
            this.options[optionKey] = option
        });
    }

    public apply(point: Point) {
        var newPos,
            x,
            y,
            canvasWidth = this.canvas.width,
            canvasHeight = this.canvas.height,
            i = (point.Y * canvasWidth + point.X) * 4;

        this.imageData = this.context.base.getImageData(0, 0, canvasWidth, canvasHeight);
        this.startColor.R = this.imageData.data[i];
        this.startColor.G = this.imageData.data[i + 1];
        this.startColor.B = this.imageData.data[i + 2];
        this.fillColor.R = this.canvas.drawingToolColor.R;
        this.fillColor.G = this.canvas.drawingToolColor.G;
        this.fillColor.B = this.canvas.drawingToolColor.B;

        var pixelPos,
            reachLeft,
            reachRight,
            drawingBoundLeft = 0,
            drawingBoundTop = 0,
            drawingBoundRight = canvasWidth - 1,
            drawingBoundBottom = canvasHeight - 1,
            pixelStack = [[point.X, point.Y]];


        while (pixelStack.length) {

            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            // Get current pixel position
            pixelPos = (y * canvasWidth + x) * 4;

            // Go up as long as the color matches and are inside the canvas
            while (y >= drawingBoundTop && this.matchStartColor(pixelPos)) {
                y -= 1;
                pixelPos -= canvasWidth * 4;
            }

            pixelPos += canvasWidth * 4;
            y += 1;
            reachLeft = false;
            reachRight = false;

            // Go down as long as the color matches and in inside the canvas
            while (y <= drawingBoundBottom && this.matchStartColor(pixelPos)) {
                y += 1;

                this.imageData.data[pixelPos] = this.fillColor.R;
                this.imageData.data[pixelPos + 1] = this.fillColor.G;
                this.imageData.data[pixelPos + 2] = this.fillColor.B;
                this.imageData.data[pixelPos + 3] = 255;

                if (x > drawingBoundLeft) {
                    if (this.matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            // Add pixel to stack
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < drawingBoundRight) {
                    if (this.matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            // Add pixel to stack
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += canvasWidth * 4;
            }
        }

        this.context.base.putImageData(this.imageData, 0, 0);
        this.imageData = null;
    }

    private matchStartColor(pixelPos) {
        var r = this.imageData.data[pixelPos];
        var g = this.imageData.data[pixelPos + 1];
        var b = this.imageData.data[pixelPos + 2];

        if (r == this.startColor.R && g == this.startColor.G && b == this.startColor.B) {
            return true;
        }

        if (r === this.fillColor.R && g === this.fillColor.G && b === this.fillColor.B) {
            return false;
        }

        return false;
    }
}

