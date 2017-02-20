import { Component } from '@angular/core';
import { readFile, writeFile } from 'fs';
import { remote } from 'electron';

import { extname } from 'path';
import { ToolService } from '../../services/tool/tool.service';

@Component({
    selector: 'menu-component',
    template: require('./menu.component.html'),
    styles: [require('./menu.component.css')]
})
export class MenuComponent {
    private toolService: ToolService;

    constructor(toolService: ToolService) {
        this.toolService = toolService;
    }

    private new() {
        this.toolService.newDrawing();
    }

    private async open() {
        let path: string[] = await remote.dialog.showOpenDialog({
            title: 'Open',
            filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
        });

        if (path && path.length === 1) {
            readFile(path[0], (err, data) => {
                if (err) throw err;

                this.toolService.openImage(data);
            });

        }
    }

    private async save() {
        let path: string = await remote.dialog.showSaveDialog({
            title: 'Save as..',
            filters: [{ name: 'Images', extensions: ['png', 'jpg'] }]
        });

        if (path) {
            let format = extname(path);
            let imgData = this.toolService.getImage(format);
            imgData = imgData.replace(/^data:image\/\w+;base64,/, "");

            writeFile(path, imgData, 'base64', (err) => {
                if (err)
                    console.log(err);
            });
        }
    }
}
