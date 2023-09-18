import { useEffect, useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import { axiosInstance } from "@/lib/axios";
import { rentalHoseRepository } from "@/feature/rentalHouse/modules/rentalHouse.repository";
import { RentalHouse } from "@/feature/rentalHouse/type/rentalHouse";

export const useSpecificRentalHouseAndBelongingToRooms = (houseId?: string) => {
  const { showLoading, hideLoading } = useLoading();
  const [ specificRentalHouseAndBelongingToRooms, setSpecificRentalHouseAndBelongingToRooms ] = useState<RentalHouse>();

  useEffect(() => {
    if(!houseId) return
    (async () => {
      showLoading();
      const fetchedRes = await rentalHoseRepository.getRoomsWithSpecificRentalHouse(houseId);
      setSpecificRentalHouseAndBelongingToRooms(fetchedRes)
      hideLoading();
    })()
  }, [houseId]);

  return { specificRentalHouseAndBelongingToRooms };
};
