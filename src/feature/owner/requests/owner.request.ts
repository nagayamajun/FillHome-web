import { axiosInstance } from "@/lib/axios";
import { Owner, SignUpType } from "../type/owner";
import { OwnerWithTokenModel } from "../models/auth.model";

export type OwnerRequest = {
  getByFirebaseUID: () => Promise<Owner>;
  create: (signUpData: SignUpType) => Promise<OwnerWithTokenModel>;
};

const getByFirebaseUID: OwnerRequest["getByFirebaseUID"] = async () => {
  const res = await axiosInstance.get("/owners/firebase-uid");
  return res.data;
};

const create: OwnerRequest["create"] = async (signUpData: SignUpType) => {
  const res = await axiosInstance.post("/owners", signUpData);
  return res.data;
};

export const ownerRequest: OwnerRequest = {
  getByFirebaseUID,
  create,
};
