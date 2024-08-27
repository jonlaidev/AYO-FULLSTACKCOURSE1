import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';
import CountryDetail from './CountryDetail';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then(response => {
          console.log(`Hakutulokset vastaanotettu: ${response.data.length} maata löytyi`); //log
          setCountries(response.data);
        })
        .catch(error => {
          console.error('Virhe hakemassa maita:', error); //log
          setCountries([]);
        });
    } else {
      console.log('Hakuehto tyhjennetty, tyhjennetään hakutulokset'); //log
      setCountries([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearchChange = (event) => {
    console.log(`Hakuehto muuttui: ${event.target.value}`); //log
    setSearchTerm(event.target.value);
  };

  console.log('Näytetään hakutulokset'); //log
  return (
    <div>
      <h1>Maahaku</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Etsi maata..."
      />
      <br />
      <br />
      {filteredCountries.length > 10 ? (
        <p>Tarkenna hakuehtoa!</p>
      ) : filteredCountries.length > 1 ? (
        <CountryList countries={filteredCountries} />
      ) : filteredCountries.length === 1 ? (
        <CountryDetail country={filteredCountries[0]} />
      ) : (
        <p>Ei maita löytynyt</p>
      )}
    </div>
  );
};

export default App;