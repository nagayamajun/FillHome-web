import { axiosInstance } from "@/lib/axios";
import { CreateReservedRoomSchemaType } from "../type";

export type ReserveRequest = {
  create: ({
    mansion_room_id,
    input,
  }: {
    mansion_room_id: string;
    input: CreateReservedRoomSchemaType;
  }) => Promise<void>;
};

const create: ReserveRequest["create"] = async ({
  mansion_room_id,
  input,
}: {
  mansion_room_id: string;
  input: CreateReservedRoomSchemaType;
}): Promise<void> => {
  await axiosInstance.post(`/reservations/${mansion_room_id}`, input);
};

export const reserveRequest: ReserveRequest = {
  create,
};
