import { Component } from '@angular/core';

import { Point } from '../../../../util/Point';
import { IAbstractTool } from '../../../../util/other-tools/IAbstractTool';
import { ToolService } from '../../../services/tool/tool.service';

@Component({
    selector: 'cursor-position-component',
    template: require('./cursor-position.component.html')
})
export class CursorPositionComponent implements IAbstractTool {
    private toolName: string = 'CursorPosition';
    private toolService: ToolService;

    cursorPosition = "0, 0";

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
        this.cursorPosition = point.toString();
        console.log(this.cursorPosition);
        // $(this.indicator).html(pt.X + ", " + pt.Y + "px");
    }

    paperMouseLeave(point: Point) {
        // $(this.indicator).hide();
    }
}
