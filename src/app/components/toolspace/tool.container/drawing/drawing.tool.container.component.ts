import { Component, Output, EventEmitter } from '@angular/core';
import { ToolService } from '../../../../services/tool/tool.service';

@Component({
    selector: 'drawing-tool-container-component',
    template: require('./drawing.tool.container.component.html')
})
export class DrawingToolContainerComponent {
    private toolService: ToolService;
    private colors = [
        'black',
        'grey',
        'darkgrey',
        'yellow',
        'orange',
        'red',
        'blue',
        'green',
        '#DDBDF1'
    ];

    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    setDrawingPen() {
        this.toolService.setDrawingPen();
    }

    setDrawingSpray() {
        this.toolService.setSprayBrush();
    }

    setDrawingCircle() {
        this.toolService.setCircleBrush();
    }

    setSize(event) {
        this.toolService.setSize(event.value);
    }

    setSelectMode() {
        this.toolService.setSelectMode();
    }

    setColor(color: string) {
        this.toolService.setColor(color);
    }
}
