import { atom } from 'recoil';

export interface MapData {
  festivalId: number;
  name: string;
  startDate: Date;
  finishDate: Date;
  contents: string;
  locate: string;
  // image: string;
  way: boolean;
  festivalTypeId: number;
  // x: number;
  // y: number;
  lat: number;
  lng: number;
}

export const mapState = atom<MapData[]>({
  key: 'Maps',
  default: [],
});
