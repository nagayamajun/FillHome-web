import { axiosInstance } from "@/lib/axios";

export const ownerRepository = {
  async getByFirebaseUID() {
    try {
      const res = await axiosInstance.post('/auth/signup');
      return res.data
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },

}