import { useState, useEffect, useRef } from 'react';

const useFetch = (url, init) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const prevInit = useRef();
  const prevUrl = useRef();

  useEffect(() => {
    // Only refetch if url or init params change.
    if (prevUrl.current === url && prevInit.current === init) return;
    prevUrl.current = url;
    prevInit.current = init;

    fetch(process.env.REACT_APP_API_BASE_URL + url, init)
      .then(response => {
        if (response.ok) return response.json();
        setError(response);
      })
      .then(data => setUsers(data))
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url, init]);

  return [users, loading, error];
}

export default useFetch;
