import { Mansion } from "@/feature/room/type/room";
import { Photo } from "@/type/photo";

// MUST: この型から下の型に移行する
export type RentalHouse = {
  id: string;
  name: string;
  address: string;
  nearest_station: string;
  max_floor_number: number;
  building_age: number;
  rental_house_photos: Photo[];
  structure_type_id: number;
  structure_type?: any;
  // mansion_room?: MansionRoom[];
  mansion?: Mansion //rentalHouseとmansion_roomの中間テーブル
}

export type StructureType = 
  '木造' | 'S造・鉄骨造' | 'RC造・鉄筋コンクリート造';

interface StructureObject {
  [key: number]: StructureType;
}

export const Structure: StructureObject = {
  1: "木造",
  2: "S造・鉄骨造",
  3: "RC造・鉄筋コンクリート造"
};
