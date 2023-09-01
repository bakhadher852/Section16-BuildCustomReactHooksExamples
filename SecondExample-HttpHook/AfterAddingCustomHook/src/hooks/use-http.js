import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //(requestConfig, applyData) coming from outside the component
  //useCallback to avoide loop request to firebase when useing useEffect because we have isLoading and error which will rerender the app and the app will call useHttp and so on
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        //give default value if GET is not giving because the fetch default is GET
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      //check response from firebase
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      //send the obj from firebase to outside the component
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  //return the obj back to outside the component from where it called
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
