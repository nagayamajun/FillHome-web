import { axiosInstance } from "@/lib/axios";
import { FAIL_TO_GET_RENTALHOUSE, FAIL_TO_GET_ROOMS_WITH_RENTALHOUSE, SUCCESS_TO_RENTALHOUSE } from "@/constants/messages";
import { ToastResult } from "@/type/toast";
import { CreateRoom } from "../type/room";

export const roomRepository = {
  //物件の作成
  async create(
    { input, mansion_id }: {input: CreateRoom, mansion_id: string}
  ): Promise<ToastResult> {
    try {
      await axiosInstance.post(`/mansion-room/create/${mansion_id}`, 
        input
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