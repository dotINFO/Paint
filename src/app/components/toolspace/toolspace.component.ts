import { Component } from '@angular/core';
import { ToolService } from '../../services/tool/tool.service';

@Component({
    selector: 'toolspace-component',
    template: require('./toolspace.component.html')
})
export class ToolspaceComponent {
    private toolService: ToolService;

    constructor(toolService: ToolService) {
        this.toolService = toolService
    }
}
