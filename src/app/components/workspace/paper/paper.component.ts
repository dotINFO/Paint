declare var fabric;

/** angular stuff */
import { Component, ViewChild, HostListener } from '@angular/core';

/** services */
import { ToolService } from '../../../services/tool/tool.service';

/** Personal */
import { Point } from '../../../../util/point';

@Component({
    selector: 'paper-component',
    template: require('./paper.component.html'),
    styles: [require('./paper.component.css')]
})
export class PaperComponent {
    @ViewChild('paper') paper;

    private toolService: ToolService;
    private context: CanvasRenderingContext2D;


    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    public ngAfterViewInit() {
        let canvas = this.paper.nativeElement;
        this.context = canvas.getContext('2d');
        // this.toolService.setContext(this.context);
        this.toolService.setCanvas(canvas);
    }

    // @HostListener('click', ['$event'])
    // onClick(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerClick(point);
    // }


    // @HostListener('mousenter', ['$event'])
    // onMouseEnter(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerMouseEnter(point);
    // }

    // @HostListener('mouseleave', ['$event'])
    // onMouseLeave(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerMouseLeave(point);
    // }

    // @HostListener('mousedown', ['$event'])
    // onMousedown(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerStartDrawing(point);
    // }

    // @HostListener('mousemove', ['$event'])
    // onMousemove(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerMouseMove(point);
    //     this.toolService.triggerDraw(point);
    // }

    // @HostListener('mouseup', ['$event'])
    // onMouseup(event: MouseEvent) {
    //     let point = this.getPosition(event);
    //     this.toolService.triggerStopDrawing(point);
    // }

    private getPosition(event: MouseEvent): Point {
        let offsetLeft = this.paper.nativeElement.offsetLeft,
            offsetTop = this.paper.nativeElement.offsetTop,
            relativeX = (event.pageX - offsetLeft),
            relativeY = (event.pageY - offsetTop);

        return new Point(relativeX, relativeY);
    }
}
