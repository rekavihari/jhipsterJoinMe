import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'participant',
        loadChildren: () => import('./participant/participant.module').then(m => m.JhipsterJoinMeParticipantModule)
      },
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then(m => m.JhipsterJoinMeEventModule)
      },
      {
        path: 'program',
        loadChildren: () => import('./program/program.module').then(m => m.JhipsterJoinMeProgramModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJoinMeEntityModule {}
