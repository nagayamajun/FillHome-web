import { OneRoomCard } from "@/feature/rentalHouse/components/list/components/OneRoomCard";
import { MansionRoom } from "@/feature/room/type/room";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  id: string;
  houseName: string;
  img: string;
  address: string;
  rooms?: MansionRoom[];
}

export const RentalHouseCard = ({ id, houseName, img, address, rooms }: Props): JSX.Element => {

  //1番安い家賃を取得する。
  const minRent = useMemo(() => rooms && Math.min(...rooms.map(room => room.rent)), [rooms]);

  return (
    <section className="flex flex-col items-center space-y-2">      
      <div className="w-[320px] h-[320px] relative">
        <Image
          className="rounded-2xl"
          src={img}
          alt="家の写真です。"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex flex-col w-[320px] items-start text-left text-sm">
        <p className="text-base font-semibold">{houseName}</p>
        <p className="text-gray-500 mb-1">{address}</p>
        <p>¥{minRent}~</p> 
      </div>

      {/* 募集ルームを一覧表示 */}
      <div className="flex flex-col w-[320px] items-center space-y-2">
        {
          rooms?.map((room) => (
            <OneRoomCard key={room.id} room={room} rental_houseId={id} />
          ))
        }
      </div>
    </section>
  );
}