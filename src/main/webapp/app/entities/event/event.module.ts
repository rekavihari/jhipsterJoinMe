import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterJoinMeSharedModule } from 'app/shared';
import {
  EventComponent,
  EventDetailComponent,
  EventUpdateComponent,
  EventDeletePopupComponent,
  EventDeleteDialogComponent,
  eventRoute,
  eventPopupRoute
} from './';

const ENTITY_STATES = [...eventRoute, ...eventPopupRoute];

@NgModule({
  imports: [JhipsterJoinMeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EventComponent, EventDetailComponent, EventUpdateComponent, EventDeleteDialogComponent, EventDeletePopupComponent],
  entryComponents: [EventComponent, EventUpdateComponent, EventDeleteDialogComponent, EventDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterJoinMeEventModule {}
