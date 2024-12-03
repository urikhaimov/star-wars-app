import React from 'react';
import { Button, Card } from '@mui/material';

export interface CategoryResultsProps {
  category: string;
  query: string;
  results: any[];
  onViewAll: (category: string) => void;
}

const CategoryResults: React.FC<CategoryResultsProps> = ({ category, query, results, onViewAll }) => {

  return (
    <div>

      {(results && results.length && query) ? (
        <>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>

          {results.map((item: any, index: number) => (
            <Card key={index}>{item.name || item.title}</Card>
          ))}

          {results.length > 0 && (
            <Button variant="outlined" onClick={() => onViewAll(category)}>View All</Button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default CategoryResults;
