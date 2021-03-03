import { useState, useEffect } from "react";

function useDataFetch<ProcessedData, RawData = any>(
  fetchCallback: () => Promise<Response>,
  options: {
    onSuccess?: (data: ProcessedData) => void;
    process?: (data: RawData) => ProcessedData;
  } = {}
): {
  isLoading: boolean;
  data: ProcessedData | null;
  error: Error | null;
  retry: () => void;
} {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ProcessedData>();

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
        const processedData = options.process
          ? options.process(payload)
          : payload;

        setData(processedData);

        if (options.onSuccess) {
          options.onSuccess(payload);
        }
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
