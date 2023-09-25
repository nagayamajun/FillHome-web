import { axiosInstance } from "@/lib/axios";
import { FAIL_TO_GET_RENTALHOUSE, FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE, SUCCESS_TO_RENTALHOUSE } from "@/constants/messages";
import { ToastResult } from "@/type/toast";

export const roomRepository = {
  //物件の作成
  async create(
    houseId: number, name: string, layout: string, thanks_money: number, security_deposit: number, floor_number: number, stay_fee: number, rent: number, maintenance_fee: number, contract_duration: string, mansion_room_photos: string[], reserve_url: string
  ): Promise<ToastResult> {
    const mansion_room = {
      name: name,
      layout: layout,
      thanks_money: thanks_money,
      security_deposit: security_deposit,
      floor_number: floor_number,
      stay_fee: stay_fee,
      rent: rent,
      maintenance_fee: maintenance_fee,
      contract_duration: contract_duration,
      mansion_room_photos: mansion_room_photos,
      reserve_url: reserve_url
    }
    
    try {
      await axiosInstance.post(`/v1/owner/mansions/${houseId}/mansion_rooms`, 
        mansion_room
      );

      return {
        style: 'success',
        message: SUCCESS_TO_RENTALHOUSE
      }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_GET_RENTALHOUSE}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  }
}