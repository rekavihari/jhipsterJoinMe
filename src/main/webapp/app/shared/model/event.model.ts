import { Moment } from 'moment';
import { IProgram } from 'app/shared/model/program.model';
import { IParticipant } from 'app/shared/model/participant.model';

export interface IEvent {
  id?: number;
  name?: string;
  date?: string;
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
    public name?: string,
    public date?: string,
    public desc?: string,
    public imageContentType?: string,
    public image?: any,
    public startDate?: Moment,
    public endDate?: Moment,
    public programs?: IProgram[],
    public participants?: IParticipant[]
  ) {}
}
