import { axiosInstance } from "@/lib/axios";
import { FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE } from "@/constants/messages";
import { Structure } from "../type/rentalHouse";
import { CreateRentalHouse } from "../components/admin-create/type";
import { Photo } from "@/type/photo";
import { RentalHouseModel } from "../models/rentalHouse.model";

export type RentalHouseRepository = {
  create: (input: CreateRentalHouse) => Promise<RentalHouseModel>,
  getAllOwn: () => Promise<RentalHouseModel[]>,
  getAll: () => Promise<RentalHouseModel[]>
};

const create: RentalHouseRepository['create'] = async(
  input: CreateRentalHouse
): Promise<RentalHouseModel> => {
  const response =( await axiosInstance.post('rental-house/create', {
    ...input
  })).data;

  const result: RentalHouseModel = {
    id: response.id,
    name: response.name,
    address: response.address,
    nearest_station: response.nearest_station,
    max_floor_number: response.max_floor_number,
    building_age: response.building_age,
    rental_house_photos: response.rental_house_photos.map((photo: Photo) => photo.image),
    structure_type: Structure[response.structure_type_id],
  }

  return result;
};

const getAllOwn: RentalHouseRepository['getAllOwn'] =async () => {
  const response = (await axiosInstance.get(`/rental-house/owner`)).data;
  const results: RentalHouseModel[] = response.map((response: any) => {
    return {
      id: response.id,
      name: response.name,
      address: response.address,
      nearest_station: response.nearest_station,
      max_floor_number: response.max_floor_number,
      building_age: response.building_age,
      rental_house_photos: response.rental_house_photos.map((photo: Photo) => photo.image),
      structure_type: Structure[response.structure_type_id],
    }
  })
  return results;
}

const getAll: RentalHouseRepository['getAll'] =async () => {
  const response = (await axiosInstance.get('/rental-house')).data;
  const results: RentalHouseModel[] = response.map((response: any) => {
    return {
      id: response.id,
      name: response.name,
      address: response.address,
      nearest_station: response.nearest_station,
      max_floor_number: response.max_floor_number,
      building_age: response.building_age,
      rental_house_photos: response.rental_house_photos.map((photo: Photo) => photo.image),
      structure_type: Structure[response.structure_type],
      mansion: response.mansion
    }
  })
  return results;
}

export const rentalHouseRepository: RentalHouseRepository = {
  create,
  getAllOwn,
  getAll
}












// TODO
// repository層に移行する
export const rentalHoseRepository = {
    //物件と紐ずくroom一覧取得
  async getRoomsWithSpecificRentalHouse(houseId?: number | string) {
    try {
      const res = await axiosInstance.get(`/rental-house/owner/${houseId}/rental-house-to-rooms`);
      return res.data; 
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      throw new Error(`${FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE}\n${
        isTypeSafeError ? error.message : ""
      }`)
    }
  },
}

