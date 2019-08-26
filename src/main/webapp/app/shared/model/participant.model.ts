import { IEvent } from 'app/shared/model/event.model';

export interface IParticipant {
  id?: number;
  name?: string;
  email?: string;
  phone?: number;
  imageContentType?: string;
  image?: any;
  events?: IEvent[];
}

export class Participant implements IParticipant {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: number,
    public imageContentType?: string,
    public image?: any,
    public events?: IEvent[]
  ) {}
}
