const resourceTypes = [
  'All',
  'Notes',
  'Assignment',
  'Past Papers',
  'Video',
  'Document',
];

function FilterBar({ selectedType, onChange }) {
  return (
    <div className="filter-wrap">
      <label htmlFor="resource-type-filter" className="filter-label">
        Filter by category
      </label>
      <select
        id="resource-type-filter"
        value={selectedType}
        onChange={(event) => onChange(event.target.value)}
      >
        {resourceTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
