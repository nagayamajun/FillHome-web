import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";
import { RentalHouse } from "../type/rentalHouse";
import { rentalHoseRepository } from "../modules/rentalHouse.repository";

export const useOwnRentalHouses = () => {
  const { showLoading, hideLoading } = useLoading();
  const [ myRentalHouses, setMyRentalHouses ] = useState<RentalHouse[]>([]);
  
  useEffect(() => {
    (async () => {
      showLoading();
      const fetchedMyRentalHouses = await rentalHoseRepository.getAllOwn();
      setMyRentalHouses(fetchedMyRentalHouses)
      hideLoading();
    })()
  }, [])
  return { myRentalHouses }
}