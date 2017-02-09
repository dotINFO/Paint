import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
    selector: '.resizable'
})
export class ResizableDirective {
    @Output() resizeEvent: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
        let resizableConfig = {
            handles: {
                'e': '#egrip',
                'se': '#segrip',
                's': '#sgrip'
            }
        };

        $(() => {
            let element = $('#paper-wrapper');
            // element.resizable(resizableConfig);

        })
        //let element = $(el.nativeElement);
        //let element = $('#paper-wrapper');
        //element.resizable(resizableConfig);
        //element.resize(() => this.resizeEvent.emit(element));
    }
}
