import axios from 'axios';
import { PlaceExternalData } from '../types';

// Define the types for the API response and function return values


// type ApiResponse = PlaceInfo[];

// You should get your API key at https://opentripmap.io
const apiKey = "5ae2e3f221c38a28845f05b643242d4037c8e3ac7e686aa908b2673d";

export const fetchData = async (place: string): Promise<PlaceExternalData[] | []> => {
  try {
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${place}&apikey=${apiKey}`;
    const response = await axios.get<PlaceExternalData>(apiUrl);
    const placeInfo: PlaceExternalData[] = [response.data];
    // console.log("external", placeInfo);
    return placeInfo;
  } catch (error) {
    console.error(error);
    return [];
  }
};



// // You should get your API key at https://opentripmap.io
// const apiKey = "5ae2e3f221c38a28845f05b643242d4037c8e3ac7e686aa908b2673d";

// type PlaceInfo = {
//   name: string;
//   country: string;
//   lat: number;
//   lon: number;
//   population: number;
//   timezone: string;
//   status: string;
//   touristAttractions: {
//     name: string;
//     description: string;
//     imageUrl: string;
//   }[];
// };

// export const fetchData = async (place: string): Promise<PlaceInfo | undefined> => {
//   try {
//     const encodedPlace = encodeURIComponent(place);

//     // Fetch geolocation data for the place
//     const geolocationUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodedPlace}&apikey=${apiKey}`;
//     const geolocationResponse = await axios.get(geolocationUrl);

//     if (!geolocationResponse.data || geolocationResponse.data.length === 0) {
//       return undefined;
//     }

//     const { lat, lon } = geolocationResponse.data;

//     // Fetch tourist attractions near the place using its coordinates
//     const touristAttractionsUrl = `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lon - 0.25}&lat_min=${lat - 0.25}&lon_max=${lon + 0.25}&lat_max=${lat + 0.25}&kinds=tourist_attraction&format=json&limit=10&apikey=${apiKey}`;
//     const touristAttractionsResponse = await axios.get(touristAttractionsUrl);

//     if (!touristAttractionsResponse.data || touristAttractionsResponse.data.features.length === 0) {
//       return undefined;
//     }

//     const touristAttractions = touristAttractionsResponse.data.features.map(
//       (feature: any) => {
//         return {
//           name: feature.properties.name,
//           description: feature.properties.wikipedia_extracts?.text || '',
//           imageUrl: feature.properties.preview?.source || '',
//         };
//       }
//     );

//     // Combine geolocation data and tourist attractions into a single object
//     return {
//       name: geolocationResponse.data[0].name,
//       country: geolocationResponse.data[0].country,
//       lat: geolocationResponse.data[0].lat,
//       lon: geolocationResponse.data[0].lon,
//       population: geolocationResponse.data[0].population,
//       timezone: geolocationResponse.data[0].timezone,
//       status: geolocationResponse.data[0].status,
//       touristAttractions,
//     };
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// };
