import { Component } from '@angular/core';

import { Point } from '../../../../util/Point';
import { IAbstractTool } from '../../../../util/other-tools/IAbstractTool';
import { ToolService } from '../../../services/tool/tool.service';

@Component({
    selector: 'paper-dimension-component',
    template: require('./paper-dimension.component.html')
})
export class PaperDimensionComponent {
    private toolName: string = 'PaperDimension';
    private toolService: ToolService;

    constructor(toolService: ToolService) {
        this.toolService = toolService;
        this.toolService.registerAsTool(this.toolName, this);
    }

    paperClick(point: Point) {

    }
    paperMouseEnter(point: Point) {
        // $(this.indicator).show();
    }

    paperMouseMove(point: Point) {
        console.log('Position is ' + point.X + ', ' + point.Y);
        // $(this.indicator).html(pt.X + ", " + pt.Y + "px");
    }

    paperMouseLeave(point: Point) {
        // $(this.indicator).hide();
    }

}
