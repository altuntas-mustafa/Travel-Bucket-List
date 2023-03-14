export type PlaceExternalData = {
  id: string
  name: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
  status: string;
};

export type PlaceData = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
  status: string;
  visited: false
};
export type DbPlace = {
  places: object[],
  totalNumberOfPlaceVisited: number,
  totalNumberOfPlaceInBucket: number,
  totalCountryVisited: number,
  totalCountryInBucket: number,
};