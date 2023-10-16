import { axiosInstance } from "@/lib/axios";
import { Owner } from "../type/owner";

export const ownerRepository = {
  async getByFirebaseUID() {
    try {
      const res = await axiosInstance.post("/auth/signup");
      return res.data;
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: "failed",
        message: `${isTypeSafeError ? error.message : ""}`,
      };
    }
  },
};

export type OwnerRequest = {
  getByFirebaseUID: () => Promise<Owner>
}

const getByFirebaseUID: OwnerRequest['getByFirebaseUID'] = async() => {
  const res = await axiosInstance.get("/owner/firebase-uid");
  return res.data;
};

export const ownerRequest: OwnerRequest = {
  getByFirebaseUID
}