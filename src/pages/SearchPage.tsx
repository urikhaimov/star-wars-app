import React, { useState } from 'react';
import AutocompleteSearch from '../components/AutocompleteSearch';
import SearchResults from '../components/SearchResults'
import debounce from 'lodash/debounce';
import useCategories from '../hooks/useCategories';

const SearchPage: React.FC = () => {

  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const { data } = useCategories();
  const categories: string[] = data && Object.keys(data);
  const updateQuery = debounce((value: string) => {
    setDebouncedQuery(value);
  }, 100) // 500ms debounce delay


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
  };

  return (
    <div>
      <h1>Star Wars Search</h1>
      <AutocompleteSearch query={debouncedQuery} handleSearchChange={handleSearchChange} />
      {categories && <SearchResults query={debouncedQuery} categories={categories} />}
    </div>
  );
};

export default SearchPage;
