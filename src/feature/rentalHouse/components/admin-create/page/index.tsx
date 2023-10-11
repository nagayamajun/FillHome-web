import { PlainTitle } from "@/components/Title/PlainTitle";
import { CreateRentalHouseForm } from "../components/CreateRentalhouseForm";

export const AddRentalHouse = (): JSX.Element => (
  <div className="flex flex-col w-4/5 my-8 items-center justify-center bg-white space-y-8 rounded-md">
    <div className="w-full sm:w-4/5 mt-8">
      <PlainTitle titleText="物件の登録" />
    </div>
    <CreateRentalHouseForm />
  </div>
);
