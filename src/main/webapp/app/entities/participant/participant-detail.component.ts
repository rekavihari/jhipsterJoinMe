import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IParticipant } from 'app/shared/model/participant.model';

@Component({
  selector: 'jhi-participant-detail',
  templateUrl: './participant-detail.component.html'
})
export class ParticipantDetailComponent implements OnInit {
  participant: IParticipant;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ participant }) => {
      this.participant = participant;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
