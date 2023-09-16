import { ReactElement } from "react";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { GetServerSideProps } from "next";
import { RoomDetail } from "@/feature/room/page/RoomDetail";
import { MansionRoomWithRentalHouse } from "@/feature/room/type/room";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";


export const getServerSideProps: GetServerSideProps = async (context) => {
  //queryを取得
  const rental_house_id = context.query.rental_house_id;
  const id =  context.query.id;

  const mansionRoomWithRentalHouse = (await axiosInstance.get(`/v1/rental_houses/${rental_house_id}/mansions/mansion_rooms/${id}`)).data;

  return {
    props: { mansionRoomWithRentalHouse },
  };
};

type Props = {
  mansionRoomWithRentalHouse: MansionRoomWithRentalHouse;
};

const RoomWithHouseDetailPage = ({ mansionRoomWithRentalHouse }: Props): ReactElement => {

  return (
    <RoomDetail roomWithRentalHouse={mansionRoomWithRentalHouse} />
  )
}


RoomWithHouseDetailPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default RoomWithHouseDetailPage ;
