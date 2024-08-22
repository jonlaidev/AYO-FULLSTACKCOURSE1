const Filter = ({ searchTerm, onSearchChange }) => {
    const handleChange = (event) => {
      console.log(`Search term changed: ${event.target.value}`); // log_search_term_changed
      onSearchChange(event);
    };
  
    return (
      <div>
        <p>Filter shown with</p>
        <input value={searchTerm} onChange={handleChange} />
      </div>
    );
  };
  
  export default Filter;  