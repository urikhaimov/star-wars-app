import { useQueries } from 'react-query';
import axios from 'axios';
import url from '../api/url';


const fetchSearchResults = async (category: string | null, query: string) => {
  const { data } = await axios.get(`${url}/${category}/?search=${query}`);
  return data.results.slice(0, 3); // Limit results to top 3
};



const useSearchResults = (query: string, categories: string[]) => {
  // Create an array of query configurations
  const queryConfigs = categories && categories.map((category) => ({
    queryKey: ['search', category, query],
    queryFn: () => fetchSearchResults(category, query),
    enabled: !!query, // Enable query only if `query` is not empty
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000
  }));

  // Pass query configurations to `useQueries`
  const queryResults = useQueries(queryConfigs);

  // Aggregate results dynamically
  const results = categories.reduce((acc, category, index) => {
    acc[category] = queryResults[index]?.data || [];
    return acc;
  }, {} as Record<string, any[]>);

  const isLoading = queryResults.some((result) => result.isLoading);
  const isError = queryResults.some((result) => result.isError);
  const error = queryResults.find((result) => result.isError)?.error;

  return { results, isLoading, isError, error };
};

export default useSearchResults;