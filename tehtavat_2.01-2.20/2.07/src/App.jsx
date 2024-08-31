import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name === newName);
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
      <div>Debug: {newName}</div>
    </div>
  );
}

export default App;