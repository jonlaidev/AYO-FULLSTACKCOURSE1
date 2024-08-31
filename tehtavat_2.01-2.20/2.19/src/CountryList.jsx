import React from 'react';

const CountryList = ({ countries }) => {
  return (
    <div>
      <h2>Maiden hakutulokset</h2>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;