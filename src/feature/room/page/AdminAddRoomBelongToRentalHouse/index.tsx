import { PlainButton } from "@/components/atoms/Button";
import { PlainInput } from "@/components/molecules/Input"
import { PlainSelectInput } from "@/components/molecules/SelectInput";
import { FileField } from "@/components/organisms/FileField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateRoomSchema } from "../../type/schema";
import { uploadFirebaseStorageAndReturnDownloadURLs } from "@/utils/firebase.utils";
import { roomRepository } from "../../modules/room.repository";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";

export const AdminAddRentalRoom = () => {
  const { query } = useRouter() ;

  const { handleSubmit, register, formState: {errors, isSubmitting}, control, watch} = useForm({
    resolver: zodResolver(CreateRoomSchema)
  });

  const { showLoading, hideLoading } = useLoading();
  const { showToast, hideToast } = useToast();

  const onSubmit = async(data: any) => {
    const urls = await uploadFirebaseStorageAndReturnDownloadURLs({files: data.mansion_room_photos, destinationPath: 'roomPhotos'});

    try {
      showLoading();
      await roomRepository.create(query.houseId as unknown as number, data.name, data.layout, data.thanks_money, data.security_deposit, data.floor_number, data.stay_fee, data.rent, data.maintenance_fee, data.contract_duration, urls, data.reserve_url)
      .then(({ style, message }) => {
        showToast({ message, style });
        setTimeout(() => {
          hideToast();
          // router.reload()
        }, 1000)
      })
      hideLoading();
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="flex flex-col w-full items-center  min-h-screen h-full space-y-10 bg-gray-50">
      <div className="flex flex-col w-full md:w-4/5 lg:w-2/3 xl:w-1/2 min-h-screen h-full items-center bg-white space-y-8 pb-16">
        <div className="mt-8 font-semibold text-center">ルームの登録</div>
        <form action="" className="w-full sm:w-4/5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <PlainInput
            label="部屋名(部屋番号)"
            register={register}
            registerValue="name"
            inputType="text"
            placeholder="部屋名をご記入ください"
            error={errors.name?.message as string}
          />
          <PlainInput
            label="宿泊費(キャンセル料)"
            register={register}
            registerValue="stay_fee"
            inputType="number"
            placeholder="料金をご記入ください"
            error={errors.stayFee?.message as string}
          />
          <PlainInput
            label="家賃"
            register={register}
            registerValue="rent"
            inputType="text"
            placeholder="家賃をご記入ください"
            error={errors.rent?.message as string}
          />
          <div className="flex ">
            <PlainInput
              label="礼金"
              register={register}
              registerValue="thanks_money"
              inputType="number"
              placeholder="礼金をご入力ください"
              error={errors.thanksMoney?.message as string}
            />
            <PlainInput
              label="敷金"
              register={register}
              registerValue="security_deposit"
              inputType="number"
              placeholder="敷金をご記入ください"
              error={errors.securityDeposit?.message as string}
            />
          </div>
          <div className="flex ">
            <PlainInput
              label="契約期間"
              register={register}
              registerValue="contract_duration"
              inputType="text"
              placeholder="契約期間をご入力ください"
              error={errors.contractDuration?.message as string}
            />
            <PlainInput
              label="階層"
              register={register}
              registerValue="floor_number"
              inputType="number"
              placeholder="階数をご記入ください"
              error={errors.floorDeposit?.message as string}
            />
          </div>

          {/* リファクタ */}
          <PlainSelectInput 
            labelText="間取り"
            registerValue="layout"
            register={register}
            error={errors.layout?.message as string}
          >
            <option value="1R">1R</option>
            <option value="1K">1K</option>
            <option value="1DK">1DK</option>
            <option value="1LDK">1LDK</option>
            <option value="2K">2K</option>
            <option value="2DK">2DK</option>
            <option value="2LDK">2LDK</option>
            <option value="3DK">3DK</option>
            <option value="3LDK">3LDK</option>
            <option value="4DK">4DK</option>
            <option value="4LDK">4LDK</option>
            <option value="その他">その他</option>
          </PlainSelectInput>

          <PlainInput
            label="共益費"
            register={register}
            registerValue="maintenance_fee"
            inputType="number"
            placeholder="共益費をご入力ください"
            error={errors.maintenance_fee?.message as string}
          />

          <PlainInput
            label="GoogleForm"
            register={register}
            registerValue="reserve_url"
            inputType="text"
            placeholder="GoogleFormをご入力ください"
            error={errors.reserve_url?.message as string}
          />

          <FileField
            labelText="部屋写真の選択"
            control={control}
            error={errors.image?.message as string}
            registerValue="mansion_room_photos"
            register={register}
            watch={watch}
          />
          <div className="flex justify-center">
            <PlainButton
              innerText="登録する"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}