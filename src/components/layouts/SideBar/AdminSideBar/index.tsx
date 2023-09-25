import { AdminHeading } from "@/components/atoms/Heading/admin";
import { Routing } from "@/hooks/routing";
import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import { IoIosCreate } from "react-icons/io";

export const AdminSidebar = () => {

  //SideBarに必要なリンクの配列
  const menuLinks = [
    {
      href: Routing.adminRentalHouses.buildRoute().path,
      label: "マンション一覧",
      icon: <CiViewList />,
    },
    {
      href: Routing.addRentalHouse.buildRoute().path,
      label: "マンション追加",
      icon: <IoIosCreate />,
    },
  ];
  
  return (
    <div className="flex flex-col w-52 pr-2 min-h-screen h-auto bg-gray-800 text-white">
      <div className="flex justify-center items-center h-20 border-b border-white mx-2">
        <AdminHeading />
      </div>
      <div className="flex flex-col items-center ">
        {menuLinks.map((menu) => (
          <Link
            key={menu.label}
            href={menu.href}
            className="flex flex-row items-center justify-start font-semibold h-16 ml-2 w-full hover:bg-pink-color"
          >
            <div className="text-2xl mr-2">{menu.icon}</div>
            <div>{menu.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}