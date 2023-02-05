import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CidadeComponent } from './list/cidade.component';
import { CidadeDetailComponent } from './detail/cidade-detail.component';
import { CidadeUpdateComponent } from './update/cidade-update.component';
import { CidadeDeleteDialogComponent } from './delete/cidade-delete-dialog.component';
import { CidadeRoutingModule } from './route/cidade-routing.module';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
    imports: [SharedModule, CidadeRoutingModule, NgSelectModule],
  declarations: [CidadeComponent, CidadeDetailComponent, CidadeUpdateComponent, CidadeDeleteDialogComponent],
  entryComponents: [CidadeDeleteDialogComponent],
})
export class CidadeModule {}
