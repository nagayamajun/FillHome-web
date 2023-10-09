import { PlainInput } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlainSelectInput } from "@/components/SelectInput";
import { FileField } from "@/components/FileField";
import { PlainButton } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useCreateRentalHouse } from "../hooks/useCreateRentalHouse";
import { Routing } from "@/Routing/routing";
import { useRouter } from "next/router";
import { ADDRESS, ADDRESS_LABEL, BUILDING_AGE, BUILDING_AGE_LABEL, MANSION, MANSION_LABEL, MAX_FLOOR_NUMBER, MAX_FLOOR_NUMBER_LABEL, NEAREST_STATION, NEAREST_STATION_LABEL, RENTAL_HOUSE_PHOTOS, RENTAL_HOUSE_PHOTOS_LABEL, STRUCTURE_TYPE, STRUCTURE_TYPE_LABEL } from "@/constants/messages";
import { RentalHouseSchema, RentalSchemaType } from "../../../type";

export const CreateRentalHouseForm = () => {
  const router = useRouter();

  // react-hook-form
  const { handleSubmit, register, formState: { errors }, watch } = useForm<RentalSchemaType>({
    resolver: zodResolver(RentalHouseSchema)
  });

  const { handleCreate } = useCreateRentalHouse();

  const onSubmit = async(data: RentalSchemaType): Promise<void> => {
    const rentalHouse = await handleCreate(data);
    if (rentalHouse?.id) router.push(Routing.adminRoomsBelongToHouse.buildRoute({ houseId: rentalHouse.id }).path)
  } 

  return (
    <form action="" className="w-full sm:w-4/5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <PlainInput
        label={MANSION_LABEL}
        register={register}
        registerValue={MANSION}
        inputType="text"
        placeholder="建物名を入力"
        error={errors.name?.message as string}
      />
      <PlainInput
        label={ADDRESS_LABEL}
        register={register}
        registerValue={ADDRESS}
        inputType="text"
        placeholder="住所を記入"
        error={errors.address?.message as string}
      />
      <PlainInput
        label={NEAREST_STATION_LABEL}
        register={register}
        registerValue={NEAREST_STATION}
        inputType="text"
        placeholder="最寄駅をご記入ください"
        error={errors.nearest_station?.message as string}
      />
      <div className="flex ">
        <PlainInput
          label={MAX_FLOOR_NUMBER_LABEL}
          register={register}
          registerValue={MAX_FLOOR_NUMBER}
          inputType="number"
          placeholder="何階建の建物ですか？"
          error={errors.max_floor_number?.message as string}
        />
        <PlainInput
          label={BUILDING_AGE_LABEL}
          register={register}
          registerValue={BUILDING_AGE}
          inputType="number"
          placeholder="築年数をご記入ください"
          error={errors.building_age?.message as string}
        />
      </div>
      <PlainSelectInput
        labelText={STRUCTURE_TYPE_LABEL}
        registerValue={STRUCTURE_TYPE}
        register={register}
        error={errors.nearest_station?.message as string}
      >
        <option value="1">木造</option>
        <option value="2">S造・鉄骨造</option>
        <option value="3">RC造・鉄筋コンクリート造</option>
      </PlainSelectInput>

      <FileField
        labelText={RENTAL_HOUSE_PHOTOS_LABEL}
        error={errors.rental_house_photos?.message as string}
        registerValue={RENTAL_HOUSE_PHOTOS}
        register={register}
        watch={watch}
      />
      <div className="flex justify-center pb-8">
        <PlainButton
          innerText="登録する"
          type="submit"
        />
      </div>
    </form>
  )
};