import { ReactElement } from "react";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ISR_REVALIDATE } from "@/constants/constants";
import { SearchableRentalHouseList } from "@/feature/rentalHouse/components/list/page";
import { rentalHoseRepository } from "@/feature/rentalHouse/repositoties/rentalHouse.repository";
import { RentalHouseModel, rentalHouseFactory } from "@/feature/rentalHouse/models/rentalHouse.model";


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

RentalHousesPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default RentalHousesPage;
