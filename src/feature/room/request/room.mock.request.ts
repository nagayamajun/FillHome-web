import { RoomMock } from "@/fixture/room.mock";
import { RoomRequest } from "./room.request";
import { RentalHouseMock } from "@/fixture/rentalHouse.mock";
import { MansionRoomModel } from "../models/room.model";

const getOneWithRentalHouse: RoomRequest["getOneWithRentalHouse"] = async ({
  id,
  rental_house_id,
}: {
  id: string;
  rental_house_id: string;
}) => {
  const mansion_room = new RoomMock().create(1);
  const rentalHouse = new RentalHouseMock().create(1);
  return {
    mansion_room: mansion_room[0],
    rental_house: rentalHouse[0],
  };
};

const getAllWithRentalHouse: RoomRequest['getAllWithRentalHouse'] =async (houseId) => {
  const mansion_rooms = new RoomMock().create(10);
  const rental_house = new RentalHouseMock().create(1);

  return {
    mansion_rooms: mansion_rooms,
    rental_house: rental_house[0]
  }
};

const getOne: RoomRequest['getOne'] =async (mansion_room_id) => {
  const mansion_room = new RoomMock().create(1);
  return mansion_room[0].available_dates;
};

const create: RoomRequest['create'] = async({input, mansion_id}) => {
  const mansion_room = new RoomMock().create(1);
  return mansion_room[0].id as unknown as Pick<MansionRoomModel, "id">;
};


const mockRoomRequest: RoomRequest = {
  getOneWithRentalHouse,
  create,
  getAllWithRentalHouse,
  getOne
};