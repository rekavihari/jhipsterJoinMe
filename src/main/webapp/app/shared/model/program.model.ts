import { Moment } from 'moment';
import { IEvent } from 'app/shared/model/event.model';

export interface IProgram {
  id?: number;
  name?: string;
  desc?: string;
  imageContentType?: string;
  image?: any;
  latitude?: number;
  longitude?: number;
  startDate?: Moment;
  endDate?: Moment;
  event?: IEvent;
}

export class Program implements IProgram {
  constructor(
    public id?: number,
    public name?: string,
    public desc?: string,
    public imageContentType?: string,
    public image?: any,
    public latitude?: number,
    public longitude?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public event?: IEvent
  ) {}
}
