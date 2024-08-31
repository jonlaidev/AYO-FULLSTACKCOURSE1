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
    
    if (newName.trim() === '') return;
    
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
      setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
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