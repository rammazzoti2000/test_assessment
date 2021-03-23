import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

    try {
      const fetchUsers = async () => {
        const headers = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        };

        setLoading(true);
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL + url, { headers });
        setUsers(res.data);
        setLoading(false);
      };

      fetchUsers();
    } catch(err) {
        console.error(err);
        setError(err);
    }
  }, [url, init]);

  return [users, loading, error];
}

export default useFetch;
