export interface SearchResult<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  export interface Person {
    name: string;
    height: string;
    mass: string;
    gender: string;
    birth_year: string;
    url: string;
  }
  
  export interface Film {
    title: string;
    director: string;
    producer: string;
    release_date: string;
    url: string;
  }
  
  // Add similar types for planets, species, etc., as needed.
  