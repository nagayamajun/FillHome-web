import { Owner } from "@/feature/owner/type/owner";
import { atom } from "recoil";

//最初の状態をnullにする
export type OwnerStateType = Owner | null;

export const OwnerState = atom<OwnerStateType>({
  key: "OwnerState",
  default: null,
});
