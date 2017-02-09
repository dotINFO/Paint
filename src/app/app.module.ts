import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PaperComponent } from './components/workspace/paper/paper.component';

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
        ToolbarComponent,
        WorkspaceComponent,
        PaperComponent,
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
