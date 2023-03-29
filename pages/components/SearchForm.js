import { useState } from "react";

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("views");
  const [sortOrder, setSortOrder] = useState("desc");
  const [includeShorts, setIncludeShorts] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(query, sortOption, sortOrder, includeShorts);
  }

  function handleSortOptionChange(event) {
    setSortOption(event.target.value);
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value);
  }

  function handleIncludeShortsChange(event) {
    setIncludeShorts(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search videos"
          aria-label="Search videos"
          aria-describedby="button-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn btn-primary" type="submit" id="button-search">
          Search
        </button>
      </div>
      <div className="mb-4">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSortOptionChange}>
            <option value="views">Views</option>
            <option value="subscribers">Subscribers</option>
            <option value="publishedDate">Published Date</option>
            <option value="name">Name</option>
          </select>
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={handleSortOrderChange}
          />
          Descending
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={handleSortOrderChange}
          />
          Ascending
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={includeShorts}
            onChange={handleIncludeShortsChange}
          />
          Include shorts
        </label>
      </div>
    </form>
  );
}