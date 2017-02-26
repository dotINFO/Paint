import { Component, Output, EventEmitter } from '@angular/core';
import { ToolService } from '../../../../services/tool/tool.service';
import { Color } from '../../../../../util/Drawing/drawing';

@Component({
    selector: 'tdshapes-tool-container-component',
    template: require('./tdshapes.tool.container.component.html')
})
export class TDShapesToolContainerComponent {
    private toolService: ToolService;

    private shapes = [
        'Rectangle',
        'Ellipse'
    ];

    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }
}
