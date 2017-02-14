declare var electron: any;
import { Component } from '@angular/core';

// const { Remote } = electron;

@Component({
    selector: 'menu-component',
    template: require('./menu.component.html'),
    styles: [require('./menu.component.css')]
})
export class MenuComponent {


    private open() {
        electron.remote.dialog.showOpenDialog({
            title: 'Open',
            filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },]
        });
    }

    private save() {
        electron.remote.dialog.showSaveDialog({
            title: 'Save as..',
            filters: [{ name: 'Images', extensions: ['jpg', 'png'] },]
        });
    }
}
