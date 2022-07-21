import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'estado',
        data: { pageTitle: 'academiaApp.estado.home.title' },
        loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule),
      },
      {
        path: 'cidade',
        data: { pageTitle: 'academiaApp.cidade.home.title' },
        loadChildren: () => import('./cidade/cidade.module').then(m => m.CidadeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
