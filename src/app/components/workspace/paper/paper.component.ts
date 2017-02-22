/** angular stuff */
import { Component, ViewChild, HostListener } from '@angular/core';

/** services */
import { ToolService } from '../../../services/tool/tool.service';

/** Personal */
import { Point } from '../../../../util/Drawing/drawing';

@Component({
    selector: 'paper-component',
    template: require('./paper.component.html'),
    styles: [require('./paper.component.css')]
})
export class PaperComponent {
    @ViewChild('paper') paper;
    @ViewChild('papervolatile') paperVolatile;

    private toolService: ToolService;
    private context: CanvasRenderingContext2D;


    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    public ngAfterViewInit() {
        let canvas = this.paper.nativeElement;
        this.context = canvas.getContext('2d');
        this.toolService.setCanvas(this.paper.nativeElement, this.paperVolatile.nativeElement);
    }

    private getPosition(event: MouseEvent): Point {
        let offsetLeft = this.paper.nativeElement.offsetLeft,
            offsetTop = this.paper.nativeElement.offsetTop,
            relativeX = (event.pageX - offsetLeft),
            relativeY = (event.pageY - offsetTop);

        return new Point(relativeX, relativeY);
    }
}
