import { axiosInstance } from "@/lib/axios"

export interface RentalHouseRequest {
  edit: ({input, rentalHouseId}: { input: any, rentalHouseId: string}) => Promise<any>
}

const edit: RentalHouseRequest['edit'] = async ({input, rentalHouseId}: { input: any, rentalHouseId: string}) => {
  const response = await axiosInstance.put(`/rental-house/${rentalHouseId}`, input);
  return response.data
}

export const rentalHouseRequest: RentalHouseRequest = {
  edit
}