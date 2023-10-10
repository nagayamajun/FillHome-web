import { RentalHouse } from "@/feature/rentalHouse/type/rentalHouse";
import { Photo } from "@/type/photo";
import { MansionRoomModel } from "../models/room.model";
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model";

//Roomタイプの共通カラム
export type BaseRoom = {
  id: string;
  layout: Layout;
  thanks_money: number;  // 礼金
  security_deposit: number; // 敷金
  floor_number: number; // 階層
  stay_fee: number;
  rent: number; // 賃金
  maintenance_fee: number;
  contract_duration: string; // 契約期間
  mansion_room_photos: Photo[];
  available_dates?: string[];
  reserve_url: string;
}

export type Layout = 
  '1R' | '1K' |'1DK' | '1LDK' | '2K' | '2DK' | '2LDK' | '3DK' 
  | '3LDK' | '4DK' | '4LDK' | 'その他';
  
//マンションの中間テーブル
export type Mansion = {
  id: string, //mansion_roomをcreateする時はこの値が必要
  rental_house_id: string,
  mansion_rooms?: MansionRoom[]
}

//mansion_roomを作成する時の型
export type CreateRoom = Omit<MansionRoom, 'id'> & { mansion_id: string}

//マンションの型
export type MansionRoom = BaseRoom;

export type MansionRoomsWithRentalHouse = {
  mansionRoom: MansionRoom[]; 
  rentalHouse: RentalHouse; 
};
export type MansionRoomWithRentalHouse = {
  mansion_room: MansionRoomModel; 
  rental_house: RentalHouseModel; 
};

