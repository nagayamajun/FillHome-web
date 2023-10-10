import { RentalHouseSearchBox } from "../components/RentalHouseSearchBox";
import { RentalHouseList } from "../components/RentalHouseList";
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model";

type Props = {
  rentalHouses: RentalHouseModel[]
}

export const SearchableRentalHouseList = ({ rentalHouses }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen h-full">
      <RentalHouseSearchBox />
      <RentalHouseList
        rentalHouses={rentalHouses}
      />
    </div>
  )
};