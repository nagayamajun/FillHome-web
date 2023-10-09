import { AdminLayout } from "@/components/layouts/Layout/AdminLayout";
import { AdminRentalHouseList } from "@/feature/rentalHouse/component/admin-list/page";
import { ReactElement } from "react";

const RentalHouseListPage = (): JSX.Element => <AdminRentalHouseList />;

RentalHouseListPage.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default RentalHouseListPage;