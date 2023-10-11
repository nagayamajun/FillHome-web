import Image from "next/image";
import { Structure, StructureType } from "../../../../../rentalHouse/type/rentalHouse";
import { Layout } from "@/feature/room/type/room";

type Props = {
  id: string,
  name: string,
  address: string,
  nearest_station: string,
  max_floor_number: number,
  building_age: number,
  rental_house_photos: string, 
  structure_type: StructureType,
}

export const AdminRentalHouseInfo = ({
  id, name, address, nearest_station, structure_type, max_floor_number,building_age, rental_house_photos
}: Props) => (
  <>
    <div className="w-sm md:w-md lg:w-lg h-[320px] lg:h-[400px] relative">
      <Image
        className="rounded-2xl"
        src={rental_house_photos}
        alt="家の写真です。"
        objectFit="cover"
        layout="fill"
      />
    </div>
    <div className="w-sm md:w-md lg:w-lg ">
      <h3 className="font-semibold text-xl">{name}</h3>
      <div className="flex-col space-y-2 bg-gray-100 rounded-lg px-4 py-5 my-6">
        <div>
          <p className="text-xs">住所</p>
          <p>&nbsp;{address}</p>
        </div>
        <div>
          <p className="text-xs">最寄駅</p>
          <p>&nbsp;{nearest_station}</p>
        </div>
        <div className="flex justify-between">
          <div className="w-1/3">
            <p className="text-xs">構造</p>
            <p>{structure_type}</p>
          </div>
          <div className="w-1/3">
            <p className="text-xs">階数</p>
            <p>&nbsp;{max_floor_number}建</p>
          </div>
          <div className="w-1/3">
            <p className="text-xs">築年数</p>
            <p>&nbsp;{building_age}年</p>
          </div>
        </div>
      </div>
    </div>
  </>
)