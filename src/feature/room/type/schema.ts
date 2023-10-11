import { INVALID_LAYOUT, REQUIRE_FIELD, TEN_OR_ELEVEN_CHARACTERS_PHONE_NUMBER } from "@/constants/messages";
import { DateObject } from "react-multi-date-picker";
import * as z from "zod";
import { Layout, layoutArray } from "./room";

export type RoomSchemaType = z.infer<typeof RoomSchema>;

// schema
export const RoomSchema = z.object({
  stay_fee: z.coerce.number().min(1, REQUIRE_FIELD),
  rent: z.coerce.number().min(1, REQUIRE_FIELD),
  thanks_money: z.coerce.number().min(1, REQUIRE_FIELD),
  security_deposit: z.coerce.number().min(1, REQUIRE_FIELD),
  contract_duration: z.string().min(1, REQUIRE_FIELD),
  floor_number: z.coerce.number().min(1, REQUIRE_FIELD),
  // layout: z.string().min(1, REQUIRE_FIELD),
  layout: z.string().refine((data) => layoutArray.includes(data as Layout), {
    message: INVALID_LAYOUT
  }),
  maintenance_fee: z.coerce.number().min(1, REQUIRE_FIELD),
  mansion_room_photos: z.custom<FileList>().refine((fileList) => fileList.length >= 1, {
    message: REQUIRE_FIELD,
  }),
  // reserve_url: z.string().min(1, REQUIRE_FIELD),
  // available_dates: z.unknown(),
  // available_dates: z.custom<DateObject[]>().refine((date) => console.log(date), {
  //   message: REQUIRE_FIELD,
  // }),
  available_dates: z.array(z.custom<DateObject>()).min(1, REQUIRE_FIELD)
});


export const CreateReservedRoomSchema = z.object({
  stay_date: z.string().min(1, REQUIRE_FIELD),
  last_name: z.string().min(1, REQUIRE_FIELD),
  first_name: z.string().min(1, REQUIRE_FIELD),
  phone_number: z.string()  .refine((phoneNumber) => {
    const length = phoneNumber.replace(/[-()\s]/g, "").length;
    return length === 10 || length === 11;
  }, {
    message: TEN_OR_ELEVEN_CHARACTERS_PHONE_NUMBER,
  }),
  email: z.string().min(1, REQUIRE_FIELD),
  address: z.string().min(1, REQUIRE_FIELD),
})