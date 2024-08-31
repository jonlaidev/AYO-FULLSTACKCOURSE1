import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const fetchWeather = async (capital) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Virhe säätiedon hakemisessa:', error);
    return null;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    country: null,
    weather: null,
  });

  useEffect(() => {
    if (newSearch) {
      axios
        .get(`https://restcountries.com/v3.1/name/${newSearch}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error('Virhe maiden hakemisessa:', error);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  }, [newSearch]);

  useEffect(() => {
    if (countries.length === 1) {
      handleShowCountry(countries[0]);
    }
  }, [countries]);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleShowCountry = async (country) => {
    const weatherData = await fetchWeather(country.capital[0]);
    setSelectedCountry({
      country,
      weather: weatherData,
    });
    setCountries([]);
  };

  if (selectedCountry.country) {
    return (
      <div>
        <h2>{selectedCountry.country.name.common}</h2>
        <p>Pääkaupunki: {selectedCountry.country.capital[0]}</p>
        <p>Väestö: {selectedCountry.country.population}</p>
        <p>Pinta-ala: {selectedCountry.country.area} km²</p>
        <h3>Kielet</h3>
        <ul>
          {Object.values(selectedCountry.country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={selectedCountry.country.flags.png}
          alt={`Flag of ${selectedCountry.country.name.common}`}
          width="200"
        />

        {selectedCountry.weather && (
          <div>
            <h3>Sää kaupungissa {selectedCountry.country.capital[0]}</h3>
            <p>Lämpötila: {selectedCountry.weather.main.temp} °C</p>
            <p>Sää: {selectedCountry.weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${selectedCountry.weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        )}

        <button onClick={() => setSelectedCountry({ country: null, weather: null })}>
          Takaisin
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Maahaku</h1>
      <input
        value={newSearch}
        onChange={handleSearchChange}
        placeholder="Hae maata..."
      />
      <ul>
        {countries.length > 10 ? (
          <p>Tarkenna hakuehtoa!</p>
        ) : countries.length > 1 ? (
          countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Näytä</button>
            </li>
          ))
        ) : null}
      </ul>
    </div>
  );
};

export default App;
