# React Course Application

## Projektin kuvaus

Tämä projekti on React-sovellus, joka esittelee kurssien tietoja ja laskee tehtävien kokonaismäärän käyttämällä `reduce`-metodia.

## Projektin rakenne

Projektin tiedostorakenne on seuraava:

graph TD
  A[Projektin kansio] --> B[src]
  B --> C[App.jsx]
  B --> D[Course.jsx]
  B --> E[Content.jsx]
  B --> F[Header.jsx]
  B --> G[Part.jsx]
  B --> H[Total.jsx]
  B --> I[main.jsx]

  D[Course.jsx] --> J[reduce-metodi]
  J --> K[course.parts]
  J --> L[sum + part.exercises]
  J --> M[0]