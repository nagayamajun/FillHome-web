import { Mansion } from "@/feature/room/type/room";
import { RentalHouseRepository, rentalHouseRepository } from "../repositoties/rentalHouse.repository";
import { StructureType } from "../type/rentalHouse";
import { CreateRentalHouse } from "../components/admin-create/type";

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
  mansion?: Mansion; //　TODO: mansionもModelに作成する
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
    },
    getAll: async () => {
      const response = await repository.getAll(); 
      return response
    }
  }

};