import { axiosInstance } from "@/lib/axios";
import { FAIL_TO_CREATE_RENTAL_HOUSE, FAIL_TO_GET_RENTALHOUSE, FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE, SUCCESS_TO_RENTALHOUSE } from "@/constants/messages";
import { RentalHouse } from "../type/rentalHouse";
import { ToastResult } from "@/type/toast";

export const rentalHoseRepository = {
  //物件と物件に紐ずくmansionRoomを全件取得
  async getAll(): Promise<RentalHouse[] | ToastResult> {
    try {
      const res = await axiosInstance.get('/rental-house');
      return res.data;
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_GET_RENTALHOUSE}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },

  //オーナーの持っている物件全件取得
  //mansionRoomは帰ってきていなくて代わりに中間テーブル(mansion)が返ってくる
  async getAllOwn(): Promise<RentalHouse[]> {
    try {
      const res = await axiosInstance.get(`/rental-house/owner`)
      return res.data
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      throw new Error(`${FAIL_TO_GET_RENTALHOUSE}\n${
        isTypeSafeError ? error.message : ""
      }`)
    }
  },
  

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

  //物件の作成
  async create(
    name: string, address: string, nearest_station: string, max_floor_number: number, building_age:  number, structure_type_id: number, rental_house_photos: string[]
  ): Promise<ToastResult> {

    // const imageObjects = rental_house_photos.map((url) => {
    //   return { image: url };
    // });
    const rental_house = {
      name: name,
      address: address,
      nearest_station: nearest_station,
      max_floor_number: max_floor_number,
      building_age: building_age,
      structure_type: structure_type_id,
      rental_house_photos: rental_house_photos
    }

    try {
      await axiosInstance.post('rental-house/create', {
        rental_house
      })

      return {
        style: 'success',
        message: SUCCESS_TO_RENTALHOUSE
      }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_CREATE_RENTAL_HOUSE}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  }
}