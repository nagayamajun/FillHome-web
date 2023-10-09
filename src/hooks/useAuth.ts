import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { OwnerState, OwnerStateType } from "@/store/owner";
import { auth } from "@/lib/firebase";
import { setAuthToken } from "@/lib/axios";
import { ownerRepository } from "@/feature/owner/modules/owner.repository";
import { useLoading } from "./useLoading";
import { Routing } from "../Routing/routing";

export const useAuth = (): OwnerStateType => {
  const router = useRouter();
  const [owner, setOwner] = useRecoilState<OwnerStateType>(OwnerState);
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      showLoading();
      //操作者がfirebase上でログインしている状態でなければ、サインインページにリダイレクト
      if (!authUser) {
        router.push(Routing.ownerSignIn.buildRoute().path);
        return;
      }

      const token = await authUser.getIdToken();
      setAuthToken(token);

      const owner = await ownerRepository.getByFirebaseUID();
      //firebase上でログインしている操作者がDBのuserレコード上では見つからなかった場合も、サインインページにリダイレクト
      if (!owner) {
        router.push(Routing.ownerSignIn.buildRoute().path);
        return;
      }
      setOwner(owner);
      hideLoading();
    });
    return () => unsub();
  }, []);

  return owner;
};

//リファクタ
//contextの形で認証が必要なページを囲う
