import { Moment } from 'moment';
import { IProgram } from 'app/shared/model/program.model';
import { IParticipant } from 'app/shared/model/participant.model';

export interface IEvent {
  id?: number;
  code?: string;
  name?: string;
  desc?: string;
  imageContentType?: string;
  image?: any;
  startDate?: Moment;
  endDate?: Moment;
  programs?: IProgram[];
  participants?: IParticipant[];
}

export class Event implements IEvent {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public desc?: string,
    public imageContentType?: string,
    public image?: any,
    public startDate?: Moment,
    public endDate?: Moment,
    public programs?: IProgram[],
    public participants?: IParticipant[]
  ) {}
}
