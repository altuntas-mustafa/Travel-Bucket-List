import express, { Request, Response } from 'express';
import { DbPlace, PlaceExternalData } from '../types';
import { getPlacesDb, updatePlaces } from './db';
import { fetchData } from './externalApi';
import { v4 as uuidv4 } from 'uuid';


const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


app.get('/api/bucketlist/:city', async (req: Request, res: Response) => {
  const placeData: PlaceExternalData[] | [] = await fetchData(req.params.city);
  res.json(placeData || []);
});
app.get('/api/visitedplaces/:city', async (req: Request, res: Response) => {
  const placeData: PlaceExternalData[] | [] = await fetchData(req.params.city);
  res.json(placeData || []);
});

app.get('/api/visitedplaces/', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const visitedPlaces = placesDb.places.filter(place => place.visited);
  res.json(visitedPlaces);
});

app.get('/api/bucketlist/', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const visitedPlaces = placesDb.places.filter(place => !place.visited);
  res.json(visitedPlaces);
});
app.get('/api/getPlace/:name', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const { name } = req.params;
  const selectedPlaces = placesDb.places.filter(place => place.name == name);
  res.json(selectedPlaces);
});
app.delete('/api/place/:id', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const { id } = req.params;

  const placeIndex = placesDb.places.findIndex((place) => place.id === id);
  if (placeIndex === -1) {
    return res.status(404).send(`Place with id ${id} not found`);
  }

  placesDb.places.splice(placeIndex, 1);
  await updatePlaces(placesDb);

  res.json(placesDb.places);
});


app.post('/api/bucketlist/:place', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  let { places, totalNumberOfPlaceVisited, totalNumberOfPlaceInBucket, totalCountryVisited, totalCountryInBucket } = placesDb
  const place: PlaceExternalData = {...req.body, visited: false, id: uuidv4(), url:[]};
  const existingPlace = places.find((b)=>b.name === place.name)
  if(existingPlace){
    res.status(200).json(existingPlace);
    return
  }
  places.push(place)
  totalNumberOfPlaceInBucket = places.length
  const updatedPlacesDb = {
    places, totalNumberOfPlaceVisited,totalNumberOfPlaceInBucket, totalCountryVisited, totalCountryInBucket 
  }
  const updatedPlacesCol = await updatePlaces(updatedPlacesDb)
  res.json(updatedPlacesCol);
});
app.post('/api/visitedplaces/:place', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  let { places, totalNumberOfPlaceVisited, totalNumberOfPlaceInBucket, totalCountryVisited, totalCountryInBucket } = placesDb
  const place: PlaceExternalData = {...req.body, visited: true, url:[]}; 
  const existingPlace = places.find((b)=>b.name === place.name)
  if(existingPlace){
    res.status(200).json(existingPlace);
    return
  }
  places.push(place)
  totalNumberOfPlaceVisited = places.length
  const updatedPlacesDb = {
    places, totalNumberOfPlaceVisited,totalNumberOfPlaceInBucket, totalCountryVisited, totalCountryInBucket 
  }
  const updatedPlacesCol = await updatePlaces(updatedPlacesDb)
  res.json(updatedPlacesCol);
});

app.put('/api/place/:id', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const { id } = req.params;

  const placeIndex = placesDb.places.findIndex((place) => place.id === id);
  if (placeIndex === -1) {
    return res.status(404).send(`Place with id ${id} not found`);
  }

  const updatedPlace = {
    ...placesDb.places[placeIndex],
    visited: req.body.visited
  };

  placesDb.places[placeIndex] = updatedPlace;
  await updatePlaces(placesDb);

  res.json(updatedPlace);
});

app.put('/api/placeUrlAdd/:id', async (req: Request, res: Response) => {
  const placesDb: DbPlace = await getPlacesDb();
  const { id } = req.params;

  const placeIndex = placesDb.places.findIndex((place) => place.id === id);
  if (placeIndex === -1) {
    return res.status(404).send(`Place with id ${id} not found`);
  }

  const updatedPlace = {
    ...placesDb.places[placeIndex],
    url: [...placesDb.places[placeIndex].url, req.body.url]
  };

  placesDb.places[placeIndex] = updatedPlace;
  await updatePlaces(placesDb);

  res.json(updatedPlace);
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
