import { ReactNode, useEffect, useState } from "react"
import { AdminSidebar } from "../SideBar/AdminSideBar"
import { useAuth } from "@/hooks/useAuth"
import { axiosInstance } from "@/lib/axios"
import { useLoading } from "@/hooks/useLoading"
import { useCertainOwner } from "@/hooks/useCertainOwner"
import { Loading } from "@/components/organisms/Loading"

type Props = {
  children: ReactNode
}

export const AdminLayout = ({ children }: Props) => {
  const { owner } = useCertainOwner();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  
  useEffect(() => {
    if (owner && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsLoading(false)
    } 
  }, [auth]);
  if (isLoading) return <Loading />

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <main className="flex flex-grow w-auto">{children}</main>
    </div>
  )
}