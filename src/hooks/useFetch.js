import { useState } from 'react';

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async (fn, ...args) => {
    try {
      setLoading(true);
      const data = await fn(...args);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchApi };
}

export default useFetch;
