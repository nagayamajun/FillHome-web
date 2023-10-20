import { axiosInstance } from "@/lib/axios";
import { Structure } from "../type/rentalHouse";
import { CreateRentalHouse } from "../components/admin-create/type";
import { Photo } from "@/type/photo";
import { RentalHouseModel } from "../models/rentalHouse.model";

export type RentalHouseRequest = {
  create: (input: CreateRentalHouse) => Promise<{id: string}>;
  getAllOwn: () => Promise<RentalHouseModel[]>;
  getAll: () => Promise<RentalHouseModel[]>;
};

const create: RentalHouseRequest["create"] = async (
  input: CreateRentalHouse
): Promise<RentalHouseModel> => {
  const response = (
    await axiosInstance.post("rental-house/create", {
      ...input,
    })
  ).data;

  return response;
};

const getAllOwn: RentalHouseRequest["getAllOwn"] = async () => {
  const response = (await axiosInstance.get(`/rental-house/owner`)).data;
  const results: RentalHouseModel[] = response.map((response: any) => {
    return {
      id: response.id,
      name: response.name,
      address: response.address,
      nearest_station: response.nearest_station,
      max_floor_number: response.max_floor_number,
      building_age: response.building_age,
      rental_house_photos: response.rental_house_photos.map(
        (photo: Photo) => photo.image
      ),
      structure_type: Structure[response.structure_type],
    };
  });
  return results;
};

const getAll: RentalHouseRequest["getAll"] = async () => {
  const response = (await axiosInstance.get("/rental-house")).data;
  const results: RentalHouseModel[] = response.map((response: any) => {
    return {
      id: response.id,
      name: response.name,
      address: response.address,
      nearest_station: response.nearest_station,
      max_floor_number: response.max_floor_number,
      building_age: response.building_age,
      rental_house_photos: response.rental_house_photos.map(
        (photo: Photo) => photo.image
      ),
      structure_type: Structure[response.structure_type],
      mansion: response.mansion,
    };
  });
  return results;
};

export const rentalHouseRequest: RentalHouseRequest = {
  create,
  getAllOwn,
  getAll,
};
