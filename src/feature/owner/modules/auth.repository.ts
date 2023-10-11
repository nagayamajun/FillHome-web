import { axiosInstance, setAuthToken } from "@/lib/axios";
import { AuthRepository } from "../type/auth.repository";
import {
  FAIL_TO_SIGNIN,
  FAIL_TO_SIGNUP,
  SUCCESS_TO_SIGNIN,
  SUCCESS_TO_SIGNUP,
} from "@/constants/messages";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ownerRepository } from "./owner.repository";

export const authRepository: AuthRepository = {
  async signUp(createData) {
    try {
      const res = await axiosInstance.post("/auth/signup", createData);
      return {
        style: "success",
        message: SUCCESS_TO_SIGNUP,
        data: res.data,
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: "failed",
        message: `${FAIL_TO_SIGNUP}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  // BEには接続しないでFEからFirebaseで検証する。
  // 参考記事 -> https://qiita.com/gagagaga_dev/items/a8dd490114c315329279
  async signIn(signInData) {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      //token取得
      const token = await userCredential.user.getIdToken();
      setAuthToken(token);

      const owner = await ownerRepository.getByFirebaseUID();

      return {
        style: "success",
        message: SUCCESS_TO_SIGNIN,
        data: owner,
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: "failed",
        message: `${FAIL_TO_SIGNIN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },
};
