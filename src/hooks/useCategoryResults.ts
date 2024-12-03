import { useQuery } from 'react-query';
import axios from 'axios';
import url from '../api/url';

const fetchCategoryResults = async (category: string) => {
  const { data } = await axios.get(`${url}/${category}`);
  return data
};

const useCategoryResults = (category: string) => {
  const { data, isLoading, isError } = useQuery([category], () => fetchCategoryResults(category), {
    enabled: !!category, staleTime: 1 * 60 * 1000
  });


  return { data, isLoading, isError };
}

export default useCategoryResults;
