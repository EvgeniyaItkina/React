import { useState, useCallback } from 'react';
import axios from 'axios';

const baseCardsURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"

const useAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiCall = useCallback(async (method, payload) => {
    try {
      setIsLoading(true);
      let response;

      switch (method) {
        case METHOD.CARDS_GET_ALL:
          response = await axios.get(baseCardsURL);
          break;

        // другие методы

        default:
          throw new Error('Invalid API method');
      }

      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return [data, error, isLoading, apiCall];
}

export const METHOD = {
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_GET_ONE: 'CARDS_GET_ONE',

  USERS_GET_ALL: 'USERS_GET_ALL',
  USERS_GET_ONE: 'USERS_GET_ONE',

  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};
export default useAPI;