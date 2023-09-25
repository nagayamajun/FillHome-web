import { StoryObj } from "@storybook/react";
import { RentalHouseCard } from ".";
import { BaseRoom } from "@/feature/room/type/room";

const meta = {
  title: 'feature/property/components/list/components/RentalHotelCard',
  component: RentalHouseCard,
}

export default meta;

type Story = StoryObj<typeof RentalHouseCard>;

const baseRentalCardArgs = {
  houseName: 'テストテストテストテストテストテストテスト',
  img: '/exapmleHouse.jpg',
  address: 'テストテストテストテストテストテストテスト'
}

const room: BaseRoom[] = [{
  id: 1,
  layout: '1DK',
  thanks_money: 10000,
  security_deposit: 50000,
  floor_number: 5,
  rent: 80000,
  contract_duration: '1年',
  stay_fee: 15000,
  mansion_room_photos: [{
    id: '3',
    image: '/exapmleHouse.jpg',
  }],
  maintenance_fee: 500,
  reserve_url: 'http'
}]

//対応するroom無しの場合
export const RentalHouseCardWithOutRoomCard: Story = {
  args: {
    ...baseRentalCardArgs
  },
  render: ({ houseName, img, address, id }) => (
    <RentalHouseCard 
      id={id}
      houseName={houseName}
      img={img}
      address={address}
    />
  )
}

//対応するroom有りの場合
export const RentalHotelCardWithRoomCard: Story = {
  args: {
    ...baseRentalCardArgs,
    rooms: room
  },
  render: ({ houseName, img, address, rooms, id }) => (
    <RentalHouseCard
      id={id}
      houseName={houseName}
      img={img}
      address={address}
      rooms={rooms}
    />
  )
}