import { axiosInstance } from "@/lib/axios";
import { CreateRoom, MansionRoomWithRentalHouse } from "../type/room";
import { MansionRoomModel } from "../models/room.model";
import { Photo } from "@/type/photo";
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model";
import { Structure } from "@/feature/rentalHouse/type/rentalHouse";

export type RoomRepository = {
  getOneWithRentalHouse: (
    { id, rental_house_id }: { id: string, rental_house_id: string }
  ) => Promise<MansionRoomWithRentalHouse>,
  create: (
    { input, mansion_id }: { input: CreateRoom, mansion_id: string}
  ) => Promise<Pick<MansionRoomModel, 'id'>>
};

const getOneWithRentalHouse: RoomRepository['getOneWithRentalHouse'] = async(
  { id, rental_house_id }: { id: string, rental_house_id: string }
) => {
  const { mansion_room, rental_house } = (await axiosInstance.get(`/mansion-room/rental-house/${rental_house_id}/room/${id}`)).data;
  const resRoom: MansionRoomModel = {
    id: mansion_room.id,
    layout: mansion_room.layout,
    thanks_money: mansion_room.thanks_money, 
    security_deposit: mansion_room.security_deposit,
    floor_number: mansion_room.floor_number,
    stay_fee: mansion_room.stay_fee,
    rent: mansion_room.rent,
    maintenance_fee: mansion_room.maintenance_fee,
    contract_duration: mansion_room.contract_duration,
    mansion_room_photos: mansion_room.mansion_room_photos.map((photo: Photo) => photo.image),
    // TODO: この箇所は後々変更する
    available_dates: mansion_room.available_dates,
    reserve_url: mansion_room.reserve_url
  }

  const resRentalHouse: RentalHouseModel = {
    id: rental_house.id,
    name: rental_house.name,
    address: rental_house.address,
    nearest_station: rental_house.nearest_station,
    max_floor_number: rental_house.max_floor_number,
    building_age: rental_house.building_age,
    rental_house_photos: rental_house.rental_house_photos.map((photo: Photo) => photo.image),
    structure_type: Structure[rental_house.structure_type],
  }

  return {
    mansion_room: resRoom,
    rental_house: resRentalHouse
  }
}

export const create: RoomRepository['create'] = async(
  { input, mansion_id }: { input: CreateRoom, mansion_id: string}
) => {
  const response = await axiosInstance.post(`/mansion-room/create/${mansion_id}`, input);
  return response.data.id
}

export const roomRepository: RoomRepository = {
  getOneWithRentalHouse,
  create
}