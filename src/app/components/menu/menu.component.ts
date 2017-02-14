import { Component } from '@angular/core';

@Component({
    selector: 'menu-component',
    template: require('./menu.component.html'),
    styles: [require('./menu.component.css')]
})
export class MenuComponent {


    private save() {
        let dialog = require('electron');
    }
}
