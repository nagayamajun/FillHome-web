import { Mansion, MansionRoom } from "@/feature/room/type/room";
import { Photo } from "@/type/photo";

// MUST: この型から下の型に移行する
export type RentalHouse = {
  id: number;
  name: string;
  address: string;
  nearest_station: string;
  max_floor_number: number;
  building_age: number;
  rental_house_photos: Photo[];
  structure_type_id: number;
  structure_type?: any; // 型が決まっていない
  // mansion_room?: MansionRoom[];
  mansion?: Mansion //rentalHouseとmansion_roomの中間テーブル
}

// 新しいRentalHouse型
// 従来との違い -> mansionは中間テーブルで受け取りMansionRoom型だけを含める, urlはurlだけを抽出する
export type ReRentalHouse = {
  id: string;
  name: string;
  address: string;
  nearest_station: string;
  max_floor_number: number;
  building_age: number;
  rental_house_photos: string[];
  structure_type_id: number;
  mansion?: MansionRoom[];
}

interface StructureObject {
  [key: number]: string;
}
export const Structure: StructureObject = {
  1: "木造",
  2: "S造・鉄骨造",
  3: "RC造・鉄筋コンクリート造"
};
