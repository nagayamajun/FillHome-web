import { ToastResult } from "@/type/toast";
import { Owner } from "./owner";

export type AuthRepository = {
  signUp: (
    createData: Omit<Owner, "id" | "firebase_uid"> & { password: string }
  ) => Promise<ToastResult<Owner>>;
  signIn: (
    signInData: Pick<Owner, "email"> & { password: string }
  ) => Promise<ToastResult<Owner>>;
};
