import { REQUIRE_FIELD, TEN_OR_ELEVEN_CHARACTERS_PHONE_NUMBER } from "@/constants/messages";
import * as z from "zod";

//SignUpのschema
export const CreateRoomSchema = z.object({
  stay_fee: z.coerce.number().min(1, REQUIRE_FIELD),
  rent: z.coerce.number().min(1, REQUIRE_FIELD),
  thanks_money: z.coerce.number().min(1, REQUIRE_FIELD),
  security_deposit: z.coerce.number().min(1, REQUIRE_FIELD),
  contract_duration: z.string().min(1, REQUIRE_FIELD),
  floor_number: z.coerce.number().min(1, REQUIRE_FIELD),
  layout: z.string().min(1, REQUIRE_FIELD),
  maintenance_fee: z.coerce.number().min(1, REQUIRE_FIELD),
  mansion_room_photos: z.unknown(), //TODO: 型をつける
  reserve_url: z.string().min(1, REQUIRE_FIELD),
  available_dates: z.unknown(), //TODO: 型をつける
});
export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;

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