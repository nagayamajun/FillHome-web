
export type Reservation = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  stay_date: string,
  phone_number: string,
  address: string
}

export type CreateReservation = Omit<Reservation, 'id'>