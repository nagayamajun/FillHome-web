import { MansionRoomModel } from "@/feature/room/models/room.model"

export class RoomMock {
  create(num: number): MansionRoomModel[] {
    return [...new Array(num)].map((_, i) => {
      return {
        id: String(i),
        layout: `1R`,
        thanks_money: i,
        security_deposit: i,
        floor_number: i,
        stay_fee: i,
        rent: i,
        maintenance_fee: i,
        contract_duration: `2年`,
        mansion_room_photos: ['/exapmleHouse.jpg'],
        available_dates: ['2022-4-13'],
      }
    }) 
  }
}