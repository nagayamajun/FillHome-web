import { PlainLink } from "@/components/atoms/Link";
import { AdminRentalHouseInfo } from "@/feature/rentalHouse/share/AdminRentalHouseInfo";
import { AdminRoomListBelongToRentalHose } from "../../components/AdminRoomListBelongToRentalHose";
import { Routing } from "@/hooks/routing";
import { useRouter } from "next/router";
import { useSpecificRentalHouseAndBelongingToRooms } from "../../hooks/useSpecificRentalHouseAndBelongingToRooms";
import { Loading } from "@/components/organisms/Loading";

export const RoomListBelongToOwnerHose = () => {
  const router = useRouter();
  const { houseId } = router.query;
  const { specificRentalHouseAndBelongingToRooms } = useSpecificRentalHouseAndBelongingToRooms(houseId as string);
  console.log('testtest', specificRentalHouseAndBelongingToRooms)
  // const rentalHousesWithRoom = fetchedRentalHousesWithRoom;
  if(!specificRentalHouseAndBelongingToRooms) return  <Loading />
  return (
    <div className="flex flex-col items-center w-full min-h-screen h-full space-y-10 mb-8">
      <AdminRentalHouseInfo 
        id={specificRentalHouseAndBelongingToRooms?.id}
        // rental_house_photos={specificRentalHouseAndBelongingToRooms?.rental_house_photos}
        name={specificRentalHouseAndBelongingToRooms?.name}
        address={specificRentalHouseAndBelongingToRooms?.address}
        nearest_station={specificRentalHouseAndBelongingToRooms?.nearest_station}
        structure_type_id={specificRentalHouseAndBelongingToRooms?.structure_type_id}
        max_floor_number={specificRentalHouseAndBelongingToRooms?.max_floor_number}
        building_age={specificRentalHouseAndBelongingToRooms?.building_age}
      />

      <div className="sm: w-1/2 md:w-1/3 lg:w-1/4 ">
        {/* TODO: createUI作る時にPath指定 */}
        <PlainLink
          innerText="ルームを作成する"
          path={Routing.adminAddRoomBelongToHouse.buildRoute({ houseId: specificRentalHouseAndBelongingToRooms?.mansion?.id! }).path}
        />
      </div>

      <AdminRoomListBelongToRentalHose
        mansionRooms={specificRentalHouseAndBelongingToRooms?.mansion}
      />
    </div>
  )
}