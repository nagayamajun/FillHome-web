import { ReactElement } from "react";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ISR_REVALIDATE } from "@/constants/constants";
import { SearchableRentalHouseList } from "@/feature/rentalHouse/page";
import { rentalHoseRepository } from "@/feature/rentalHouse/repositoties/rentalHouse.repository";


export const getStaticProps: GetStaticProps = async () => {
  // TODO:  apiができたらデータフェッチする。
  const fetchedRentalHouses = await rentalHoseRepository.getAll();

  return {
    props: { fetchedRentalHouses },
    revalidate: ISR_REVALIDATE,
  };
};

type Props = {
  fetchedRentalHouses: InferGetStaticPropsType<typeof getStaticProps>;
};

const RentalHousesPage = ({ fetchedRentalHouses }: Props): ReactElement => (
  <SearchableRentalHouseList rentalHouses={fetchedRentalHouses} />
);

RentalHousesPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default RentalHousesPage;
