import { useState, useEffect } from "react";

function useDataFetch<T>(
  fetchCallback: () => Promise<Response>
): {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  retry: () => void;
} {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>();

  function fetchData() {
    setLoading(true);

    fetchCallback()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((payload) => {
        setData(payload);
      })
      .catch((err) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, error, retry: fetchData };
}

export default useDataFetch;
