import { PlainLink } from "@/components/Link";
import { AdminRentalHouseInfo } from "@/feature/rentalHouse/share/AdminRentalHouseInfo";
import { AdminRoomListBelongToRentalHose } from "../../components/AdminRoomListBelongToRentalHose";
import { Routing } from "@/Routing/routing";
import { useRouter } from "next/router";
import { useSpecificRentalHouseAndBelongingToRooms } from "../../hooks/useSpecificRentalHouseAndBelongingToRooms";

export const RoomListBelongToOwnerHose = () => {
  const router = useRouter();
  const { houseId } = router.query;
  const { specificRentalHouseAndBelongingToRooms } = useSpecificRentalHouseAndBelongingToRooms(houseId as string);

  if(!specificRentalHouseAndBelongingToRooms) return  <></>
  return (
    <div className="flex flex-col items-center w-full min-h-screen h-full space-y-10 mb-8">
      <AdminRentalHouseInfo 
        id={specificRentalHouseAndBelongingToRooms?.id}
        rental_house_photos={specificRentalHouseAndBelongingToRooms?.rental_house_photos[0].image!}
        name={specificRentalHouseAndBelongingToRooms?.name}
        address={specificRentalHouseAndBelongingToRooms?.address}
        nearest_station={specificRentalHouseAndBelongingToRooms?.nearest_station}
        structure_type_id={specificRentalHouseAndBelongingToRooms?.structure_type_id}
        max_floor_number={specificRentalHouseAndBelongingToRooms?.max_floor_number}
        building_age={specificRentalHouseAndBelongingToRooms?.building_age}
      />

      <div className="sm: w-1/2 md:w-1/3 lg:w-1/4 ">
        <PlainLink
          innerText="ルームを作成する"
          path={Routing.adminAddRoomBelongToHouse.buildRoute({ houseId: houseId as string }).path}
        />
      </div>

      <AdminRoomListBelongToRentalHose
        mansionRooms={specificRentalHouseAndBelongingToRooms?.mansion}
      />
    </div>
  )
}