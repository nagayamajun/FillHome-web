import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { ReservedMansionRoom } from "@/feature/room/page/ReservedRoom"
import { ReactElement } from "react";

const ReservedMansionRoomPage = () => <ReservedMansionRoom/>

ReservedMansionRoomPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;
export default ReservedMansionRoomPage