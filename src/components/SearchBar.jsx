import { useState } from "react";
import { searchCities } from "../services/weatherService";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim();
    if (name.length < 2) return;

    const found = await searchCities(name);
    setResults(found);
  }

  function handleSelect(place) {
    onSelect({
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
    });
    setQuery("");
    setResults([]);
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Buscar cidade..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="search__button" type="submit">
          Buscar
        </button>
      </form>

      {results.length > 0 && (
        <ul className="search__results">
          {results.map((place) => (
            <li key={place.id}>
              <button
                className="search__result"
                onClick={() => handleSelect(place)}
              >
                {[place.name, place.admin1, place.country]
                  .filter(Boolean)
                  .join(", ")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
