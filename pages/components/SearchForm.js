import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('views');
  const [sortOrder, setSortOrder] = useState('desc');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(query, sortOption, sortOrder);
  }

  function handleSortOptionChange(event) {
    setSortOption(event.target.value);
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Search videos"
        variant="outlined"
        size="small"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">Search</Button>
      <div>
        <FormControl size="small">
          <InputLabel>Sort by</InputLabel>
          <Select value={sortOption} onChange={handleSortOptionChange}>
            <MenuItem value="views">Views</MenuItem>
            <MenuItem value="subscribers">Subscribers</MenuItem>
            <MenuItem value="publishedDate">Published Date</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <RadioGroup row value={sortOrder} onChange={handleSortOrderChange}>
          <FormControlLabel value="desc" control={<Radio size="small" />} label="Descending" />
          <FormControlLabel value="asc" control={<Radio size="small" />} label="Ascending" />
        </RadioGroup>
      </div>
    </form>
  );
}