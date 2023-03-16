import { DbPlace, PlaceData } from "../types";

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Mustafa3835:123456789M.@hackday.ayipck5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "HackDay";

const getPlaceCollection = async () => {
  await client.connect();
  const db = client.db(dbName);
  return db.collection('places');
};

export const createPlace = async () => {
  const placeVisited: DbPlace = {
    places: [],
    totalNumberOfPlaceVisited: 0,
    totalNumberOfPlaceInBucket: 0,
    totalCountryVisited: 0,
    totalCountryInBucket: 0,
  };
  const collection = await getPlaceCollection();
  const result = await collection.insertOne(placeVisited);
  console.log("Inserted new cart with ID:", result.insertedId);
  return placeVisited;
};
export const updatePlaces = async (placeVisited: DbPlace) => {
  const collection = await getPlaceCollection();
  await collection.updateOne(
    {},
    { $set: placeVisited }
  );
  const updatedPlaceCol = await collection.findOne({});
  return updatedPlaceCol;
};
export const getPlacesDb = async () => {
  const collection = await getPlaceCollection();
  const placesDb = await collection.findOne({});
  return placesDb;
};
