import { useQuery } from 'react-query';
import axios from 'axios';
import url from '../api/url';

const fetchCategories = async () => {
  const { data } = await axios.get(`${url}/`);
  return data
};


const useCategoryResults = () => {
  const { data, isLoading, isError } = useQuery(['categories'], () => fetchCategories(), {
    staleTime: 1 * 60 * 1000
  });


  return { data, isLoading, isError };
}

export default useCategoryResults;