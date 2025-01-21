/* eslint-disable no-unused-vars */
import { useReducer, useState, useCallback, useEffect } from "react";

const ACTIONS = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

function useFetch(initialUrl, initialOptions = {}) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isError: false,
    isLoading: true,
  });

  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  const doFetchFilter = useCallback((fetchUrl, fetchOptions = {}) => {
    setUrl(fetchUrl);
    setOptions(fetchOptions);
  }, []);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.FETCH_INIT });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Error al realizar la petición");
        }
        const result = await response.json();
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: result });
      } catch (error) {
        dispatch({ type: ACTIONS.FETCH_FAILURE });
      }
    };

    fetchData();
  }, [url, options]);

  return [state, doFetchFilter];
}

export default useFetch;
