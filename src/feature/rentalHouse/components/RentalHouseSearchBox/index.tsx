import { SearchBox } from "@/components/Search"
import { Routing } from "@/hooks/routing";
import { useRouter } from "next/router"
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export const RentalHouseSearchBox = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = ({houseName} :{houseName?: string}) => {
    handleFiltered(houseName);
  }

  // paramsに条件を追加する関数
  // 条件が増えた時の事を考え,switch文使用
  const handleFiltered = useCallback((houseName?: string) => {
    switch (true) {
      case !!houseName:
        houseName && router.push(Routing.rentalHousesByHouseName.buildRoute({houseName}).path);
        break;
      case (!houseName):
        router.push(Routing.rentalHouses.buildRoute().path);
      default:
        router.push(Routing.rentalHouses.buildRoute().path);
    }
  }, [router])

  return (
    <div className="mt-4 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchBox
          register={register}
          registerValue='houseName'
          placeholder="探したい賃貸を入力" 
        />
      </form>
    </div>
  )
}