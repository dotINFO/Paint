declare var nrequire: any;
import { Component } from '@angular/core';

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

    private async open() {
        let path: string = await nrequire('electron').remote.dialog.showOpenDialog({
            title: 'Open',
            filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
        });

        if (path.length === 1) {
            const fs = nrequire('fs');
            fs.readFile(path[0], (err, data) => {
                if (err) throw err;

                this.toolService.openImage(data);
            });

        }
    }

    private async save() {
        let path: string = await nrequire('electron').remote.dialog.showSaveDialog({
            title: 'Save as..',
            filters: [{ name: 'Images', extensions: ['jpg', 'png'] }]
        });

        if (path) {
            const fs = nrequire('fs');
            debugger;
            let img = this.toolService.getImage();
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            fs.writeFile(path, data, 'base64', (err) => {
                console.log(err);
            });
        }
    }
}
