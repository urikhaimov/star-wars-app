import React from 'react';
import { Input } from '@mui/material';


export interface AutocompleteSearchProps {
  query: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ query, handleSearchChange }) => {

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default AutocompleteSearch;
