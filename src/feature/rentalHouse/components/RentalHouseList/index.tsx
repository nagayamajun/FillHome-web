import { useRouter } from "next/router"
import { RentalHouse } from "../../type/rentalHouse"
import { RentalHouseCard } from "../RentalHouseCard"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export type Props = {
  rentalHouses: RentalHouse[]
}

export const RentalHouseList = ({ rentalHouses }: Props): JSX.Element => {
  const { query } = useRouter();
  if (!rentalHouses.length) return <p>投稿が存在しません</p>;

  // queryの値と部分一致
  const filteredHouses = rentalHouses.filter((house) => {
     if (query.houseName) {
      return house.name.includes(query.houseName as string);
     } else {
      return rentalHouses
     }
  });

  return (
    <div className="mt-8 flex flex-col gap-8">
      {
        filteredHouses.map((house) => {
          return (
            <RentalHouseCard 
              id={house.id}
              key={house.id} 
              houseName={house.name}
              img={house.rental_house_photos[0]?.image}
              address={house.address}
              rooms={house.mansion?.mansion_rooms}
            />
          )
        })
      }
    </div>
  )
}