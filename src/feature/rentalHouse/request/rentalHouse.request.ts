import { axiosInstance } from "@/lib/axios";
import { Structure } from "../type/rentalHouse";
import { CreateRentalHouse } from "../components/admin-create/type";
import { Photo } from "@/type/photo";
import { RentalHouseModel } from "../models/rentalHouse.model";
import { RentalHousesWithCount } from "../components/list/type";
import { MansionRoomModel } from "@/feature/room/models/room.model";

export interface RentalHouseRequest {
  create: (input: CreateRentalHouse) => Promise<{ id: string }>;
  getAllOwn: () => Promise<RentalHouseModel[]>;
  getAll: () => Promise<RentalHouseModel[]>;
  getSearch: (params: SearchParams) => Promise<RentalHousesWithCount>;
  edit: ({
    id,
    input,
  }: {
    id: string;
    input: CreateRentalHouse;
  }) => Promise<{ id: string }>;
}

const create: RentalHouseRequest["create"] = async (
  input: CreateRentalHouse
): Promise<RentalHouseModel> => {
  const response = (
    await axiosInstance.post("rental-houses", {
      ...input,
    })
  ).data;

  return response;
};

const getAllOwn: RentalHouseRequest["getAllOwn"] = async () => {
  const response = (await axiosInstance.get(`/rental-houses/owner`)).data;
  const results: RentalHouseModel[] = (response as any[]).map(
    (response: any) => {
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
    }
  );
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

export type SearchParams = {
  search?: string;
  offset?: string;
  limit: number;
};

const getSearch: RentalHouseRequest["getSearch"] = async (
  params: SearchParams
) => {
  const response = (
    await axiosInstance.get(`/rental-houses/search`, { params: params })
  ).data;

  const rentalHouses: RentalHouseModel[] = (response.rental_houses ?? []).map(
    (rentalHouse: any) => {
      rentalHouse.mansion_rooms = rentalHouse.mansion_rooms.map((room: any) => {
        return {
          ...room,
          mansion_room_photos: room.mansion_room_photos.map(
            (photo: Photo) => photo.image
          ),
        };
      });
      return {
        ...rentalHouse,
        rental_house_photos: rentalHouse.rental_house_photos.map(
          (photo: Photo) => photo.image
        ),
        structure_type: Structure[rentalHouse.structure_type],
      };
    }
  );

  return {
    rentalHouses,
    totalCount: response.total_count,
  };
};

const edit: RentalHouseRequest["edit"] = async ({ id, input }) => {
  const response = (await axiosInstance.put(`test/${id}`, { ...input })).data;
  return response;
};

export const rentalHouseRequest: RentalHouseRequest = {
  create,
  getAllOwn,
  getAll,
  getSearch,
  edit,
};
