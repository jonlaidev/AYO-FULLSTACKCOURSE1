import { useState, useEffect } from 'react';
import axios from 'axios';
import weatherService from './weatherService';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (newSearch) {
      console.log(`Haku käynnistetty: ${newSearch}`); // log
      axios
        .get(`https://restcountries.com/v3.1/name/${newSearch}`)
        .then(response => {
          console.log(`Hakutulokset vastaanotettu: ${response.data.length} maata löytyi`); // log
          setCountries(response.data);
        })
        .catch(error => {
          console.error('Virhe maiden hakemisessa:', error); // log
          setCountries([]);
        });
    } else {
      console.log('Hakuehto tyhjennetty, tyhjennetään hakutulokset'); // log
      setCountries([]);
    }
  }, [newSearch]);

  const handleSearchChange = (event) => {
    console.log(`Hakuehto muuttui: ${event.target.value}`); // log
    setNewSearch(event.target.value);
  };

  const fetchWeather = (capital) => {
    weatherService.getWeather(capital)
      .then(data => {
        console.log(`Säätiedot haettu: ${capital}`); // log
        setWeather(data);
      })
      .catch(error => {
        console.error('Virhe säätietojen hakemisessa:', error); // log
        setWeather(null);
      });
  };

  const handleShowCountry = (country) => {
    console.log(`Näytetään maa: ${country.name.common}`); // log
    setSelectedCountry(country);
    setCountries([]);
    fetchWeather(country.capital[0]);
  };

  if (selectedCountry) {
    console.log(`Näytetään yksityiskohdat maasta: ${selectedCountry.name.common}`); // log
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Population: {selectedCountry.population}</p>
        <p>Area: {selectedCountry.area} km²</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(selectedCountry.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="200" />
        {weather && (
          <div>
            <h3>Weather in {selectedCountry.capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
          </div>
        )}
        <button onClick={() => setSelectedCountry(null)}>Takaisin</button>
      </div>
    );
  }

  console.log('Näytetään hakutulokset'); // log
  return (
    <div>
      <h1>Country Information</h1>
      <input value={newSearch} onChange={handleSearchChange} placeholder="Search for a country..." />
      <ul>
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length > 1 ? (
          countries.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Näytä</button>
            </li>
          ))
        ) : countries.length === 1 ? (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p>Capital: {countries[0].capital}</p>
            <p>Population: {countries[0].population}</p>
            <p>Area: {countries[0].area} km²</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(countries[0].languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} width="200" />
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default App;