import "./App.css";
import { useState, useCallback } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <section>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form"
            placeholder="Batman, Star Wars, Matrix..."
            name="name-movie"
            value={search}
            onChange={handleChange}
          />
          <div>
            <input type="checkbox" checked={sort} onChange={handleSort} />{" "}
            <label>Ordenar alfabeticamente</label>
          </div>

          <button type="submit" className="btn-primary pepe">
            Buscar
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {isLoading ? <p>Cargando...</p> : <Movies movies={movies}></Movies>}
      </main>
    </section>
  );
}

export default App;
