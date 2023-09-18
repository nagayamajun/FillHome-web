import { useRouter } from "next/router";
import { useEffect } from "react";
import { Routing } from "./routing";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { axiosInstance, setAuthCookie } from "@/lib/axios";
import { useLoading } from "./useLoading";

export const useAuth = () => {
  const router = useRouter(); 
  const cookies = parseCookies();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => { 
    // cookieがない時は認証に飛ばす
    showLoading();
    if (Object.keys(cookies).length === 0) router.push(Routing.ownerSignIn.buildRoute().path);
    //headerに情報を登録できなくても認証に飛ばす。
    setAuthCookie(cookies.ownerId);
    if (!axiosInstance.defaults.headers.common["Authorization"]) router.push(Routing.ownerSignIn.buildRoute().path); 
    hideLoading();
  }, []);

  return { cookies }

};

