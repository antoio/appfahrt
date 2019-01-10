import {Station} from '../stations/station';

export interface Train {
  id: number;
  name: string;
  stop: {
    station: Station;
    departure: string;
    departureTimestamp: number;
    delay: any;
    platform: string;
  };
  category: string;
  to: string;
  passList: any;
  number: string;
  operator: string;
}
