//import 'jquery';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';

import { MenuComponent } from './components/menu/menu.component';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PaperComponent } from './components/workspace/paper/paper.component';

import { ToolspaceComponent } from './components/toolspace/toolspace.component';
import { ToolContainerComponent } from './components/toolspace/tool.container/tool.container.component';
import { DrawingToolContainerComponent } from './components/toolspace/tool.container/drawing/drawing.tool.container.component';
import { TDShapesToolContainerComponent } from './components/toolspace/tool.container/tdshapes/tdshapes.tool.container.component';
import { TextToolContainerComponent } from './components/toolspace/tool.container/text/text.tool.container.component';

import { ToolService } from './services/tool/tool.service';
import { ResizableDirective } from './directives/resizable/resizable.diretive';


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        /** Components */
        AppComponent,

        MenuComponent,

        WorkspaceComponent,
        PaperComponent,

        ToolspaceComponent,
        ToolContainerComponent,
        DrawingToolContainerComponent,
        TDShapesToolContainerComponent,

        TextToolContainerComponent,

        /** Directivs */
        ResizableDirective
    ],
    providers: [
        ToolService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
