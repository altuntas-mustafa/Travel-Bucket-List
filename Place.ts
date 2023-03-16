import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlaceExternalData } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function Place() {
  const { name } = useParams();
  const [place, setPlace] = useState<PlaceExternalData[]>([]);
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getPlace/${name}`);
      const places = response.data.map((place: PlaceExternalData) => ({
        ...place,
        id: uuidv4(),
        visited: false,
      }));
      setPlace(places);
    } catch (error) {
      console.error(error);
    }
  };

//   const handleAddPlace = (place: PlaceExternalData, url: string, setUrl: (value: string) => void) => {
//     place.url = url;
//     setUrl("");
//   };

  const handleDeletePlace = (id: string) => {
    setPlace((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="visited-places">
        {place.map((place) => (
          <div key={place.id} className="place-card">
          <div className="place-info">
            <p className="place-name">{place.name}</p>
            <p className="place-country">{place.country}</p>
            <p className="place-timezone">{place.timezone}</p>
            <p className="place-population">
              Population: {place.population}
            </p>
            {place.url.length > 0 && (
              <div className="place-urls">
                {place.url.map((url, index) => (
                    <p>
                    <a key={index} href={`http://${url}`} target="_blank" >index</a>
                    </p>
                ))}
              </div>
            )}
          </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="place-add-btn"
            //   onClick={() => handleAddPlace(place, url, setUrl)}
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
              to={`/`}
              className="place-more-info-btn"
            >
              Home
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
