export type PlaceExternalData = {
  id: string
  name: string;
  country: string;
  timezone: string;
  population: number;
  visited: boolean; // new field
  url:string[]
};


export type PlaceData = {
  id: string,
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
  places: PlaceExternalData[],
  totalNumberOfPlaceVisited: number,
  totalNumberOfPlaceInBucket: number,
  totalCountryVisited: number,
  totalCountryInBucket: number,
};