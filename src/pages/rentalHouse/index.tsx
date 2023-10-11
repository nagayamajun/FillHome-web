import { ReactElement } from "react";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { GetStaticProps } from "next";
import { SearchableRentalHouseList } from "@/feature/rentalHouse/components/list/page";
import {
  RentalHouseModel,
  rentalHouseFactory,
} from "@/feature/rentalHouse/models/rentalHouse.model";
import { ISR_REVALIDATE } from "@/constants/const";

export const getStaticProps: GetStaticProps = async () => {
  const fetchedRentalHouses = await rentalHouseFactory().getAll();

  return {
    props: { fetchedRentalHouses },
    revalidate: ISR_REVALIDATE,
  };
};

type Props = {
  fetchedRentalHouses: RentalHouseModel[];
};

const RentalHousesPage = ({ fetchedRentalHouses }: Props): ReactElement => (
  <SearchableRentalHouseList rentalHouses={fetchedRentalHouses} />
);

RentalHousesPage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default RentalHousesPage;
