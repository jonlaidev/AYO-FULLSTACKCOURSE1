import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: 'success' });

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        setNotification({ message: `Virhe tietojen hakemisessa: ${error.message}`, type: 'error' });
        setTimeout(() => setNotification({ message: null, type: 'success' }), 5000);
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
            setNotification({ message: `Päivitettiin ${newName}`, type: 'success' });
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setNotification({ message: `Virhe henkilön päivittämisessä: ${error.message}`, type: 'error' });
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotification({ message: `Lisätty ${newName}`, type: 'success' });
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setNotification({ message: `Virhe henkilön lisäämisessä: ${error.message}`, type: 'error' });
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Haluatko varmasti poistaa tämän henkilön?")) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification({ message: `Poistettu henkilö`, type: 'success' });
        })
        .catch(error => {
          setNotification({ message: `Virhe henkilön poistamisessa: ${error.message}`, type: 'error' });
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={notification.message} type={notification.type} />

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