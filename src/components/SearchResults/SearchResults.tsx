import { useNavigate } from 'react-router-dom';
import CategoryResults from '../CategoryResults'
import Loader from '../Loader';
import Error from '../Error';
import useSearchResults from '../../hooks/useSearchResults'

const isEmpty = (data:Record<string, any[]>) => {
  for (let key in data) {
    if (data[key].length > 0) return false;
  }
  return true;
}

interface SearchResultsProps {
  query: string;
  categories: string[];
}

const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { query, categories } = props;
  let navigate = useNavigate();
  const handleCategorySelect = (category: string) => {
    navigate(`/${category}`);
  };
  const { results, isLoading, isError } = useSearchResults(query, categories)
  

  return (


    <div>
      {!!isLoading && <Loader />}
      {!!isError && <Error />}
      {!isLoading && !isError && query && isEmpty(results) && <>not found</>}
      {!isLoading && !isError && categories.length && categories.map((cat, index) =>
        <CategoryResults key={index} category={cat} query={query} results={results[cat]} onViewAll={() => handleCategorySelect(cat)} />
      )}
    </div>

  );
}

export default SearchResults;