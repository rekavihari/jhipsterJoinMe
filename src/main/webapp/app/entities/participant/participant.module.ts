import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterJoinMeSharedModule } from 'app/shared';
import {
  ParticipantComponent,
  ParticipantDetailComponent,
  ParticipantUpdateComponent,
  ParticipantDeletePopupComponent,
  ParticipantDeleteDialogComponent,
  participantRoute,
  participantPopupRoute
} from './';

const ENTITY_STATES = [...participantRoute, ...participantPopupRoute];

@NgModule({
  imports: [JhipsterJoinMeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParticipantComponent,
    ParticipantDetailComponent,
    ParticipantUpdateComponent,
    ParticipantDeleteDialogComponent,
    ParticipantDeletePopupComponent
  ],
  entryComponents: [ParticipantComponent, ParticipantUpdateComponent, ParticipantDeleteDialogComponent, ParticipantDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJoinMeParticipantModule {}
