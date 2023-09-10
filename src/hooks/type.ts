
export type Route = {
  id: keyof RoutingType;
  path: string; 
}

type RoutingWithParams<T> = {
  buildRoute: (params: T) => Route;
  pathName: string;
}

type RoutingWithNoParams = {
  buildRoute: () => Route;
  pathName: string;
}

export type RoutingType = {
  //user
  //room
  room: RoutingWithParams<{ roomId: number }>;
  //rentalHouse
  rentalHouses: RoutingWithNoParams;
  rentalHousesByHouseName: RoutingWithParams<{ houseName: string }>;

  //admin
  //owner
  ownerSignUp: RoutingWithNoParams;
  ownerSignIn: RoutingWithNoParams
}