import { MansionRoom } from "@/feature/room/type/room";
import { RentalHouseRepository, rentalHouseRepository } from "../repositoties/rentalHouse.repository";
import { StructureType } from "../type/rentalHouse";
import { CreateRentalHouse } from "../component/admin-create/type";

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
  mansion?: MansionRoom[]; //　TODO: mansionもModelに作成する
}

// factory
export const rentalHouseFactory = (req?: RentalHouseRepository) => {

  const repository = req ?? rentalHouseRepository;
  
  return {
    create: async (input: CreateRentalHouse) => {
      const response = await repository.create(input);
      return response
    },
    getAllOwn: async () => {
      const response = await repository.getAllOwn();
      return response
    }
  }

};