import 'hammerjs';

import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspaceToolbarComponent } from './components/workspace/toolbar/toolbar.component';
import { PaperComponent } from './components/workspace/paper/paper.component';

import { ToolspaceComponent } from './components/toolspace/toolspace.component';
import { ToolspaceToolbarComponent } from './components/toolspace/toolbar/toolbar.component';
import { ToolContainerComponent } from './components/toolspace/tool.container/tool.container.component';
import { DrawingToolContainerComponent } from './components/toolspace/tool.container/drawing/drawing.tool.container.component';
import { TextToolContainerComponent } from './components/toolspace/tool.container/text/text.tool.container.component';

import { FootbarComponent } from './components/footbar/footbar.component';
import { CursorPositionComponent } from './components/footbar/cursor-position/cursor-position.component';
import { PaperDimensionComponent } from './components/footbar/paper-dimension/paper-dimension.component';

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

        WorkspaceComponent,
        WorkspaceToolbarComponent,
        PaperComponent,

        ToolspaceComponent,
        ToolspaceToolbarComponent,
        ToolContainerComponent,
        DrawingToolContainerComponent,
        TextToolContainerComponent,

        FootbarComponent,
        CursorPositionComponent,
        PaperDimensionComponent,
        /** Directivs */
        ResizableDirective
    ],
    providers: [
        ToolService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
