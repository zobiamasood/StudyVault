function SearchBar({ value, onChange, placeholder = 'Search resources...' }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search resources"
      />
    </div>
  );
}

export default SearchBar;
