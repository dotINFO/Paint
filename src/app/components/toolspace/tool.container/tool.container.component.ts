import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'tool-container-component',
    template: require('./tool.container.component.html')
})
export class ToolContainerComponent {

    public ngAfterViewInit() {
        // FIXME: find a way to positionate the header of a tab group in Material 2
        var header = $('#tool-container-tab-group md-tab-header'),
            toolbar = $('#toolspace-toolbar md-toolbar-row');

        toolbar.append(header.children());
    }
}
