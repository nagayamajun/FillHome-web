import { Loading } from "@/components/Loading";
import { OneRoomCard } from "@/feature/room/share/OneRoomCard";
import { MansionRoom } from "@/feature/room/type/room";
import { Routing } from "@/Routing/routing";
import { useCertainOwner } from "@/hooks/useCertainOwner";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";

type Props = {
  id: string;
  houseName: string;
  img?: string;
  address: string;
  rooms?: MansionRoom[];
}

export const RentalHouseCard = ({ id, houseName, img, address, rooms }: Props): JSX.Element => {
  // const cookies = parseCookies();
  const { owner } = useCertainOwner();

  //1番安い家賃を取得する。
  const minRent = rooms && Math.min(...rooms.map(room => room.rent));
  
  if (!img) return <Loading />
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
        {/* {
         Object.keys(cookies).length !== 0 && <p>¥{minRent}~</p> 
        } */}
        {
         owner && <p>¥{minRent}~</p> 
        }
      </div>

      {/* 募集ルームを一覧表示 */}
      <div className="flex flex-col w-[320px] items-center space-y-2">
        {
          rooms?.map((room) => (
            <OneRoomCard key={room.id} room={room} rental_houseId={id} />
          ))
        }
      </div>

      {/* ownerはrentalHouseに紐ずくroom一覧に飛ぶ(Ownerでのみ表示) */}
      {/* { Object.keys(cookies).length !== 0 && 
        <Link 
          href={Routing.adminRoomsBelongToHouse.buildRoute({ houseId: id }).path} 
          className="bg-pink-color py-3 px-6 rounded-xl text-white"
        >
          募集中のRoom一覧
        </Link>
      } */}
      { owner && 
        <Link 
          href={Routing.adminRoomsBelongToHouse.buildRoute({ houseId: id }).path} 
          className="bg-pink-color py-3 px-6 rounded-xl text-white"
        >
          募集中のRoom一覧
        </Link>
      }
    </section>
  );
}