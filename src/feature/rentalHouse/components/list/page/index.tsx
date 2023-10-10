import { RentalHouseSearchBox } from "../components/RentalHouseSearchBox";
import { RentalHouseList } from "../components/RentalHouseList";
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model";

type Props = {
  rentalHouses: RentalHouseModel[]
}

export const SearchableRentalHouseList = ({ rentalHouses }: Props): JSX.Element => {
  return (
    <>
      <RentalHouseSearchBox />
      <RentalHouseList
        rentalHouses={rentalHouses}
      />
    </>
  )
};