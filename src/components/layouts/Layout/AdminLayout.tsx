import { ReactNode } from "react"
import { AdminSidebar } from "../SideBar/AdminSideBar"
import { useAuth } from "@/hooks/useAuth"

type Props = {
  children: ReactNode
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <main className="flex flex-grow w-auto">{children}</main>
    </div>
  )
}