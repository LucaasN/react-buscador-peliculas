import { useState, useEffect, useRef } from "react"

export const useSearch = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirtsTime = useRef(true);

    useEffect(() => {
        
        if (isFirtsTime.current) {
            isFirtsTime.current = search === '';
            return;
        }

        if(!search){
            setError('No se puede buscar una pelicula vacia');
            return;
        }

        if(search.length < 2){
            setError('La busqueda debe tener al menos 2 caracteres');
            return;
        }

        setError(null);
      
    }, [search])
    
    return {search, setSearch, error}
}
