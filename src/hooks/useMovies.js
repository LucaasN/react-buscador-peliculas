import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies.js";

export const useMovies = ({ search, sort }) => {
  
  const previousSearch = useRef(search);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = useCallback(async ({search}) => {
    
    if (search === previousSearch.current) return;

    try {
      setIsLoading(true);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      throw new Error("Error searching movies...");
    } finally {
      setIsLoading(false);
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, isLoading };
};
