import { uploadFirebaseStorageAndReturnDownloadURLs } from "@/utils/firebase.utils";
import { rentalHoseRepository, rentalHouseRepository } from "../../../repositoties/rentalHouse.repository";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "react-toastify";
import { RentalSchemaType } from "../../../type";

export const useCreateRentalHouse = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleCreate = async(data: RentalSchemaType) => {
    showLoading();
    //MUST: BEにFILEの責務を移動する
    const urls = await uploadFirebaseStorageAndReturnDownloadURLs({
      files: data.rental_house_photos, destinationPath: 'rentalHousePhotos'
    });
    try {
      const response = await rentalHouseRepository.create({
        name: data.name, 
        address: data.address, 
        nearest_station: data.nearest_station, 
        max_floor_number: data.max_floor_number, 
        building_age: data.building_age, 
        structure_type_id: data.structure_type_id,
        rental_house_photos: urls
      })

      hideLoading();
      toast.success('成功しました')
      return response
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      hideLoading();
      toast.error(`失敗しました${isTypeSafeError && error.message}`)
    }
  }

  return {
    handleCreate
  }
}