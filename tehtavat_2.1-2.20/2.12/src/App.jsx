import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Virhe tietojen hakemisessa:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert(`${newName} on jo puhelinluettelossa`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Virhe henkilön lisäämisessä:', error);
        });
    }
  };

  const handleDelete = (id) => {
    /* confirm_alert:
    if (window.confirm("Haluatko varmasti poistaa tämän henkilön?")) */ {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Virhe henkilön poistamisessa:', error);
          /* deleted_alert:
          alert('Henkilön poistaminen epäonnistui. Henkilö on jo poistettu palvelimelta.'); */
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <div>
        <p>Hae:</p>
        <input value={searchTerm} onChange={handleSearchChange} />
      </div> <br/>

      <h3>Lisää uusi</h3>
      <form onSubmit={handleAddPerson}>
        <div>
          Nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>

      <h3>Numerot</h3>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;