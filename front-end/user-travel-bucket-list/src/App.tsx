import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // import uuidv4 from uuid package
import { PlaceExternalData } from "./types";

function App() {
  const [city, setCity] = useState("");
  const [newPlace, setNewPlace] = useState<PlaceExternalData[]>([]);
  const [bucketList, setBucketList] = useState<PlaceExternalData[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<PlaceExternalData[]>([]);

  useEffect(() => {
    const fetchBucketList = async () => {
      try {
        const response = await axios.get('/api/bucketlist');
        setBucketList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBucketList();
  }, []);

  useEffect(() => {
    const fetchVisitedPlaces = async () => {
      try {
        const response = await axios.get('/api/visitedplaces');
        setVisitedPlaces(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVisitedPlaces();
  }, []);

  const handleAddCity = async () => {
    try {
      const response = await axios.get(`/api/bucketlist/${city}`);
      const places = response.data.map((place: PlaceExternalData) => ({
        ...place,
        id: uuidv4(), // generate a unique id for each place
        visited: false, // set visited field to false for bucket list
      }));
      setNewPlace(places);
      setCity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>
        <label htmlFor="">Place Name</label>
      </p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleAddCity}>Add to wishlist</button>

      <ul>
        {newPlace.map((item, index) => (
          <li key={index}>
            <p>Name: {item.name}</p>
            <p>Country: {item.country}</p>
            <p>Timezone: {item.timezone}</p>
            <p>Population: {item.population}</p>
            <button
              onClick={async () => {
                try {
                  await axios.post(`/api/bucketlist/${item.id}`, { // send id in the endpoint
                    ...item,
                    visited: false, // set visited field to false
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Add to bucket list
            </button>
            <button
              onClick={async () => {
                try {
                  await axios.post(`/api/visitedplaces/${item.id}`, { // send id in the endpoint
                    ...item,
                    visited: true, // set visited field to true
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Add to visited places
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
