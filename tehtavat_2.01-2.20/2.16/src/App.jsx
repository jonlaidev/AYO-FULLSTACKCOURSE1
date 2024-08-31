import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        setNotification(`Virhe tietojen hakemisessa: ${error.message}`);
        setTimeout(() => setNotification(null), 2000);
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

    const personExists = persons.find(person => person.name === newName);

    if (personExists) {
      if (window.confirm(`${newName} on jo puhelinluettelossa. Haluatko päivittää numeron?`)) {
        const updatedPerson = { ...personExists, number: newNumber };
        personsService
          .update(personExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
            setNotification(`Päivitettiin ${newName}`);
            setTimeout(() => setNotification(null), 2000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setNotification(`Virhe henkilön päivittämisessä: ${error.message}`);
            setTimeout(() => setNotification(null), 2000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotification(`Lisätty ${newName}`);
          setTimeout(() => setNotification(null), 2000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setNotification(`Virhe henkilön lisäämisessä: ${error.message}`);
          setTimeout(() => setNotification(null), 2000);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Haluatko varmasti poistaa tämän henkilön?")) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification(`Poistettu henkilö`);
          setTimeout(() => setNotification(null), 2000);
        })
        .catch(error => {
          setNotification(`Virhe henkilön poistamisessa: ${error.message}`);
          setTimeout(() => setNotification(null), 2000);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={notification} />

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