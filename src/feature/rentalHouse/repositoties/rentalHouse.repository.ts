import { axiosInstance } from "@/lib/axios";
import { FAIL_TO_CREATE_RENTAL_HOUSE, FAIL_TO_GET_RENTALHOUSE, FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE, SUCCESS_TO_RENTALHOUSE } from "@/constants/messages";
import { ReRentalHouse, RentalHouse } from "../type/rentalHouse";
import { ToastResult } from "@/type/toast";
import { CreateRentalHouse } from "../component/admin-create/type";

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
    input: CreateRentalHouse,
  ) {
    try {
      await axiosInstance.post('rental-house/create', {
        ...input
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


export type RentalHouseRepository = {
  create: (input: CreateRentalHouse) => Promise<ReRentalHouse>,
};

const create: RentalHouseRepository['create'] = async(
  input: CreateRentalHouse
): Promise<ReRentalHouse> => {
  const response = await axiosInstance.post('rental-house/create', {
    ...input
  });

  return response.data
}

export const rentalHouseRepository = {
  create,
  
}