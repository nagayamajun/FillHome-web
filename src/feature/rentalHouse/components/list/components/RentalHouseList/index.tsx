import { useRouter } from "next/router";
import { RentalHouseCard } from "../RentalHouseCard";
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model";
import { useMemo } from "react";

export type Props = {
  rentalHouses: RentalHouseModel[];
};

export const RentalHouseList = ({ rentalHouses }: Props): JSX.Element => {
  const { query } = useRouter();
  if (!rentalHouses.length) return <p>投稿が存在しません</p>;

  // queryの値と部分一致
  const filteredHouses = rentalHouses.filter((house) => {
    if (query.houseName) {
      return house.name.includes(query.houseName as string);
    } else {
      return rentalHouses;
    }
  });

  return (
    <div className="grid gap-y-8 sm:gap-x-4 grid-cols-1 sm:grid-cols-2 mt-8 w-[90%] sm:w-[816px] items-center justify-center ">
      {filteredHouses?.map((house) => {
        return (
          <RentalHouseCard
            id={house.id}
            key={house.id}
            houseName={house.name}
            img={house.rental_house_photos[0]}
            address={house.address}
            rooms={house.mansion?.mansion_rooms}
          />
        );
      })}
    </div>
  );
};
