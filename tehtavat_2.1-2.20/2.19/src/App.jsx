import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (newSearch) {
      console.log(`Haku käynnistetty: ${newSearch}`); //log
      axios
        .get(`https://restcountries.com/v3.1/name/${newSearch}`)
        .then(response => {
          console.log(`Hakutulokset vastaanotettu: ${response.data.length} maata löytyi`); //log
          setCountries(response.data);
        })
        .catch(error => {
          console.error('Virhe maiden hakemisessa:', error); //log
          setCountries([]);
        });
    } else {
      console.log('Hakuehto tyhjennetty, tyhjennetään hakutulokset'); //log
      setCountries([]);
    }
  }, [newSearch]);

  const handleSearchChange = (event) => {
    console.log(`Hakuehto muuttui: ${event.target.value}`); //log
    setNewSearch(event.target.value);
  };

  const handleShowCountry = (country) => {
    console.log(`Näytetään maa: ${country.name.common}`); //log
    setSelectedCountry(country);
    setCountries([]);
  };

  if (selectedCountry) {
    console.log(`Näytetään yksityiskohdat maasta: ${selectedCountry.name.common}`); //log
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Pääkaupunki: {selectedCountry.capital}</p>
        <p>Väestö: {selectedCountry.population}</p>
        <p>Pinta-ala: {selectedCountry.area} km²</p>
        <h3>Kielet</h3>
        <ul>
          {Object.values(selectedCountry.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="200" />
        <button onClick={() => setSelectedCountry(null)}>Takaisin</button>
      </div>
    );
  }

  console.log('Näytetään hakutulokset'); //log
  return (
    <div>
      <h1>Maahaku</h1>
      <input value={newSearch} onChange={handleSearchChange} placeholder="Search for a country..." />
      <ul>
        {countries.length > 10 ? (
          <p>Tarkenna hakuehtoa!</p>
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
            <p>Pääkaupunki: {countries[0].capital}</p>
            <p>Väestö: {countries[0].population}</p>
            <p>Pinta-ala: {countries[0].area} km²</p>
            <h3>Kielet</h3>
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