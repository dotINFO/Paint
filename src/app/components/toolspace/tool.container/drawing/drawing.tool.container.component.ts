import { Component, Output, EventEmitter } from '@angular/core';
import { ToolService } from '../../../../services/tool/tool.service';
import { Color } from '../../../../../util/Drawing/drawing';

@Component({
    selector: 'drawing-tool-container-component',
    template: require('./drawing.tool.container.component.html')
})
export class DrawingToolContainerComponent {
    private toolService: ToolService;
    private colors = [
        '#000000', '#31465B', '#395268', '#B79A99', '#9FADB0', '#FFFFFF',
        '#D14F35', '#F46548', '#F08E31', '#FAA52A', '#F8C32E', '#FBE7A6',
        '#9C5EB6', '#A671BD', '#2A85BF', '#389EE1', '#2AA46C', '#34BD7A',
    ];

    private drawingTools = [
        'Pencil',
        'NeighbordPencil',

        // 'SprayBrush',
        // 'CircleBrush'
    ];

    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    private setDrawingTool(drawingToolName) {
        this.toolService.setDrawingTool(drawingToolName);
    }

    private setSize(event) {
        this.toolService.setSize(event.value);
    }

    private setFill() {
        this.toolService.setTool('Filler');
        // this.toolService.setFill();
    }

    private setSelectMode() {
        // this.toolService.setSelectMode();
    }

    private setColor(color: string) {
        this.toolService.setColor(Color.fromHEX(color));
    }

    private setOpacity(event) {
        this.toolService.setOpacity(event.value);
    }
}
