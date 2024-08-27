import React from 'react';

const CountryDetail = ({ country }) => {
  const { name, flags, languages } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <img src={flags.png} alt={`Lippu ${name.common}`} width="200" />
      <h3>Kielet:</h3>
      <ul>
        {Object.values(languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetail;