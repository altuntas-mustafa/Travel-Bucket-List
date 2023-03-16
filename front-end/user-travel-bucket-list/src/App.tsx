import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; 
import { PlaceExternalData } from "./types";
import Places from "./component/Places";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Place from "./component/Place";

function App() {
  const [city, setCity] = useState("");
  const [newPlace, setNewPlace] = useState<PlaceExternalData[]>([]);
  const [bucketList, setBucketList] = useState<PlaceExternalData[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<PlaceExternalData[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bucketListResponse, visitedPlacesResponse] = await Promise.all([
          axios.get("/api/bucketlist"),
          axios.get("/api/visitedplaces"),
        ]);

        setBucketList(bucketListResponse.data);
        setVisitedPlaces(visitedPlacesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dataFetched]);

  const handleAddCity = async () => {
    try {
      const response = await axios.get(`/api/bucketlist/${city}`);
      const places = response.data.map((place: PlaceExternalData) => ({
        ...place,
        id: uuidv4(),
        visited: false, 
      }));
      setNewPlace(places);
      setCity("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDataFetch = () => {
    setDataFetched(!dataFetched);
  };
  return (
    <div className="main-container">
      <div className="search-container">
        <p>
          <label htmlFor="">Search Place</label>
        </p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-search"
        />
        <button onClick={handleAddCity}>Search Place</button>
        <ul className="search-result">
          {newPlace.map((item, index) => (
            <li key={index}>
              <div className="search-result-place">
                <p>Name: {item.name}</p>
                <p>Country: {item.country}</p>
                <p>Timezone: {item.timezone}</p>
                <p>Population: {item.population}</p>
              </div>
              <div className="add-places-btn">
                <button
                  className="add-place-btn"
                  onClick={async () => {
                    try {
                      await axios.post(`/api/bucketlist/${item.id}`, {
                        ...item,
                        visited: false,
                      });
                      setNewPlace([]);
                      setDataFetched(!dataFetched);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Add to bucket list
                </button>
                <button
                  className="add-place-btn"
                  onClick={async () => {
                    try {
                      await axios.post(`/api/visitedplaces/${item.id}`, {
                        ...item,
                        visited: true,
                      });
                      setNewPlace([]);
                      setDataFetched(!dataFetched);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Add to visited places
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Places
              bucketList={bucketList}
              visitedPlaces={visitedPlaces}
              onDataFetch={handleDataFetch}
            />
          }
        ></Route>
        <Route path="/place/:name" element={<Place />} />
      </Routes>
    </div>
  );
}

export default App;
