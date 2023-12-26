import { Mansion } from "@/feature/room/type/room";
import { StructureType } from "../type/rentalHouse";
import { CreateRentalHouse } from "../components/admin-create/type";
import {
  RentalHouseRequest,
  SearchParams,
  rentalHouseRequest,
} from "../request/rentalHouse.request";
import { MansionRoomModel } from "@/feature/room/models/room.model";

// model
export type RentalHouseModel = {
  id: string;
  name: string;
  address: string;
  nearest_station: string;
  max_floor_number: number;
  building_age: number;
  rental_house_photos: string[];
  structure_type: StructureType;
  mansion_rooms?: MansionRoomModel[];
};

// factory
export const rentalHouseFactory = (req?: RentalHouseRequest) => {
  const request = req ?? rentalHouseRequest;

  return {
    create: async (input: CreateRentalHouse) => {
      const response = await request.create(input);
      return response;
    },
    getAllOwn: async () => {
      const response = await request.getAllOwn();
      return response;
    },
    getAll: async () => {
      const response = await request.getAll();
      return response;
    },
    getSearch: async (params: SearchParams) => {
      const response = await request.getSearch(params);
      return response;
    },
  };
};
