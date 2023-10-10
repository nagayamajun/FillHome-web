import { useRouter } from "next/router"
import { RentalHouseCard } from "../RentalHouseCard"
import { RentalHouseModel } from "@/feature/rentalHouse/models/rentalHouse.model"
import { useMemo } from "react"


export type Props = {
  rentalHouses: RentalHouseModel[]
}

export const RentalHouseList = ({ rentalHouses }: Props): JSX.Element => {
  const { query } = useRouter();
  if (!rentalHouses.length) return <p>投稿が存在しません</p>;

  // queryの値と部分一致
  const filteredHouses = useMemo(() => rentalHouses.filter((house) => {
     if (query.houseName) {
      return house.name.includes(query.houseName as string);
     } else {
      return rentalHouses
     }
  }), [query]);

  return (
    <div className="flex flex-col md:w-2/3 justify-center items-center">
    <div className="grid gap-y-8 md:grid-cols-2 mt-8 justify-items-center items-center">
      {
        filteredHouses.map((house) => {
          return (
            <RentalHouseCard 
              id={house.id}
              key={house.id} 
              houseName={house.name}
              img={house.rental_house_photos[0]}
              address={house.address}
              rooms={house.mansion?.mansion_rooms}
            />
          )
        })
      }
    </div>
    </div>
  )
}