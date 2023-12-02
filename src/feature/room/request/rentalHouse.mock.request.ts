import { RentalHouseMock } from "@/fixture/rentalHouse.mock";
import { RentalHouseRequest } from "./rentalHouse.request";

const edit =async ({input, rentalHouseId}: { input: any, rentalHouseId: string}): Promise<any> => {
  const response = new RentalHouseMock().create(1);
  return { id: response[0].id }
};

const deleteRentalHouse =async (id: string) => {
  
};

const mockRentalHouseRequest: RentalHouseRequest = {
  edit,
  deleteRentalHouse
};