import { axiosInstance } from "@/lib/axios";
import {
  FAIL_TO_CREATE_RESERVATION,
  SUCCESS_TO_RENTALHOUSE,
} from "@/constants/messages";
import { ToastResult } from "@/type/toast";
import { CreateReservation } from "./reserve";

// WARN:
// ここのrepository層はreserveで使われているもので変更したら削除する

export const roomRepository = {
  //物件の一件取得
  async getOne(id: string) {
    try {
      const res = await axiosInstance.get(`/mansion-room/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async reserveRoom({
    mansion_room_id,
    input,
  }: {
    mansion_room_id: string;
    input: CreateReservation;
  }): Promise<ToastResult> {
    try {
      await axiosInstance.post(`/reservation/${mansion_room_id}`, input);

      return {
        style: "success",
        message: SUCCESS_TO_RENTALHOUSE,
      };
    } catch (error) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: "failed",
        message: `${FAIL_TO_CREATE_RESERVATION}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },
};
