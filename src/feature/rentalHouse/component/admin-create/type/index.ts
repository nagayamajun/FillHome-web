import { ReRentalHouse } from "../../../type/rentalHouse";

// type
export type CreateRentalHouse = 
  Omit<ReRentalHouse, 'id' | 'mansion'>;

