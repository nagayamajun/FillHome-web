import { RentalHouseMock } from "@/fixture/rentalHouse.mock";
import { RentalHouseModel } from "../models/rentalHouse.model";
import { RentalHouseRequest, SearchParams } from "./rentalHouse.request";
import { CreateRentalHouse } from "../components/admin-create/type";
import { RentalHousesWithCount } from "../components/list/type";

const getAll = async(): Promise<RentalHouseModel[]> => {
  const response = new RentalHouseMock().create(10);
  return response
}

const getAllOwn = async(): Promise<RentalHouseModel[]> => {
  const response = new RentalHouseMock().create(10);
  return response
}

const create =async (input: CreateRentalHouse): Promise<RentalHouseModel> => {
  const response = new RentalHouseMock().create(1);
  return response[0]
}

const getSearch = async (params: SearchParams): Promise<RentalHousesWithCount> => {
  const response = new RentalHouseMock().create(10);
  const filterResponse = response.filter((rentalHouse) => rentalHouse.name == params.search);
  return {
    rentalHouses: filterResponse,
    totalCount: 10
  }
};

const edit =async ({id, input}: {id: string, input: CreateRentalHouse}): Promise<{id: string}> => {
  const response = new RentalHouseMock().create(1);
  return { id: response[0].id }
}


export const mockRentalHouseRequest: RentalHouseRequest = {
  getAll,
  getAllOwn,
  create,
  getSearch,
  edit
}