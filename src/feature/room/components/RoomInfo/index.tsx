import Image from "next/image"
import { MansionRoom } from "../../type/room"

type Props = {
  room: MansionRoom
}
export const RoomInfo = ({
  room: { floor_number, layout, thanks_money, security_deposit, rent, contract_duration, mansion_room_photos }
}: Props) => (
  <div className="flex flex-col mx-6"> 
    <h4 className="font-semibold text-lg">部屋情報</h4>
    <div className="flex-col space-y-2 bg-gray-100 rounded-lg px-4 py-5 my-4">
      <div>
        <p className="text-xs">賃料</p>
        <p className="font-semibold">&nbsp;¥{rent}</p>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="text-xs">敷金</p>
          <p>&nbsp;¥{security_deposit}</p>
        </div>
        <div className="w-1/2">
          <p className="text-xs">礼金</p>
          <p>&nbsp;¥{thanks_money}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="text-xs">間取り</p>
          <p>&nbsp;{layout}</p>
        </div>
        <div className="w-1/2">
          <p className="text-xs">階層</p>
          <p>&nbsp;{floor_number}階</p>
        </div>
      </div>
      <div>
        <p className="text-xs">契約期間</p>
        <p>&nbsp;{contract_duration}階</p>
      </div>
    </div>


    <div className="w-full h-60 relative">
      <Image
        className="rounded-xl"
        src={mansion_room_photos[0]?.image!}
        objectFit="cover"
        layout="fill"
        alt="賃貸の写真"
      />
    </div>

    <div>
    </div>
  </div>
)