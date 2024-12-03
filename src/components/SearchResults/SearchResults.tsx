import { useNavigate } from 'react-router-dom';
import CategoryResults from '../CategoryResults'
import Loader from '../Loader';
import Error from '../Error';
import useSearchResults from '../../hooks/useSearchResults'

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
           {!isLoading && !isError && categories && categories.length===0 && <>not found</>}
          {!isLoading && !isError && categories.length && categories.map((cat, index) =>
            <CategoryResults key={index} category={cat} query={query} results={results[cat]} onViewAll={() => handleCategorySelect(cat)} />
          )}
        </div>
   
  );
}

export default SearchResults;