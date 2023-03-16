import axios from "axios";
import React, { useState } from "react";
import { PlaceExternalData } from "../types";
import "./places.css";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

type Props = {
  bucketList: PlaceExternalData[];
  visitedPlaces: PlaceExternalData[];
  onDataFetch: () => void;
};

const Places = ({ bucketList, visitedPlaces, onDataFetch }: Props) => {
  const [url, setUrl] = useState("");

  const handleDeletePlace = async (placeId: string) => {
    try {
      await axios.delete(`/api/place/${placeId}`);
      onDataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckPlace = async (placeId: string) => {
    try {
      const placeToCheck = bucketList.find((place) => place.id === placeId);
      if (placeToCheck) {
        await axios.put(`/api/place/${placeId}`, { visited: true });
        onDataFetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlace = async (
    place: PlaceExternalData,
    url: string,
    setUrl: (url: string) => void
  ) => {
    try {
      await axios.put(`/api/placeUrlAdd/${place.id}`, { url });

      setUrl("");
      onDataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="places-container">
        <div className="bucket-list-container">
          <h2>Bucket List</h2>
          <div className="bucket-list">
            {bucketList.map((place) => (
              <div key={place.id} className="place-card">
                <div className="place-info">
                  <p className="place-name">{place.name}</p>
                  <p className="place-country">{place.country}</p>
                  <p className="place-timezone">{place.timezone}</p>
                  <p className="place-population">
                    Population: {place.population}
                  </p>
                </div>
                <input type="text" onChange={(e) => setUrl(e.target.value)} />
                <button
                  className="place-add-btn"
                  onClick={() => handleAddPlace(place, url, setUrl)}
                >
                  Add URL
                </button>
                <button
                  className="place-delete-btn"
                  onClick={() => handleDeletePlace(place.id)}
                >
                  Delete
                </button>
                <button
                  className="place-delete-btn"
                  onClick={() => handleCheckPlace(place.id)}
                >
                  Visited
                </button>
                <Link
                  to={`/place/${place.name}`}
                  className="place-more-info-btn"
                >
                  More Info
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="visited-places-container">
          <h2>Visited Places</h2>
          <div className="visited-places">
            {visitedPlaces.map((place) => (
              <div key={place.id} className="place-card">
                <div className="place-info">
                  <p className="place-name">{place.name}</p>
                  <p className="place-country">{place.country}</p>
                  <p className="place-timezone">{place.timezone}</p>
                  <p className="place-population">
                    Population: {place.population}
                  </p>
                </div>

                <input type="text" onChange={(e) => setUrl(e.target.value)} />
                <button
                  className="place-add-btn"
                  onClick={() => handleAddPlace(place, url, setUrl)}
                >
                  Add URL
                </button>
                <button
                  className="place-delete-btn"
                  onClick={() => handleDeletePlace(place.id)}
                >
                  Delete
                </button>
              
                <Link
                  to={`/place/${place.name}`}
                  className="place-more-info-btn"
                >
                  More Info
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Places;
