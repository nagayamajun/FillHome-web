import { RentalHouseRequest, rentalHouseRequest } from "../repositories/rentalHouse.repository";

export const rentalHouseFactory = (req?: RentalHouseRequest) => {
  const repository = req ?? rentalHouseRequest 

  return {
    edit: async ({input, rentalHouseId}: {input: any, rentalHouseId: string}) => {
      const response = await repository.edit({input, rentalHouseId});
      return response
    }
  }
};