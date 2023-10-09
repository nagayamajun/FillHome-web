import Image from "next/image";
import { MansionRoom } from "../../type/room"
import { ErrorText } from "@/components/ErrorText";
import Link from "next/link";
import { Routing } from "@/hooks/routing";
import { Loading } from "@/components/Loading";

type Props = {
  room: MansionRoom;
  rental_houseId: number
}


// house.rental_house_photos[0]?.image
export const OneRoomCard = (
  { room: { id, stay_fee, layout, mansion_room_photos }, rental_houseId }: Props
): JSX.Element => {
  if (!mansion_room_photos[0].image) return <Loading />
  
  return (
  //リンクを変えたい
  <Link href={`room/${rental_houseId}/${id}`} className="flex w-full space-x-4 rounded-lg shadow-md">
  {/* <Link href={Routing.room.buildRoute({roomId: id}).path} className="flex w-full space-x-4 rounded-lg shadow-md"> */}
    <div className=" w-[80px] h-[80px] relative">
      <Image 
        className="rounded-lg"
        src={mansion_room_photos[0].image} 
        objectFit="cover"
        layout="fill"
        alt="各部屋の写真"
      />
    </div>
    <div className="flex flex-col justify-center text-sm">
      <div className="flex flex-col">
        <p>一泊料金: ¥{stay_fee}</p>
        <ErrorText errorText="*契約しなかった場合のみ" />
      </div>
      <p>間取り: {layout}</p>
    </div>
  </Link>

  )
  }
