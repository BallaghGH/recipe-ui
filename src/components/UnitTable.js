import React, {useEffect, useRef, useState, useReducer} from 'react';
import '../App.scss';
import ConfirmationDialog from './Dialog';
import makeRequest from '../services/api';
import Table from './Table';

/**
 * In this component we fetch data asynchronously but set state separately from the data
 * As your app grows in scale, you may want to look into the state management tool redux.
 * Redux isn't for smaller applications like this one, however...
 * redux paired with redux-thunk lets you call functions asynchronously and return all of your necessary state along with the response.
 * You should have an opinion on redux if you are making a react app, it's one of the biggest state management libraries for react.
 * My opinion on it is that it's great, however, if used incorrectly, can be harrowing on performance, that's where i come in!
 * 
 * At it's core, redux's principles are that you can share state across components with a store, you see where we are passing props to the 
 * table component below, well, we could create ten table components, and instead of passing each component individual props,
 * create a global store and connect them all to it and not have to go through the bother of dirlling down each prop, 
 * instead we could keep one global source of truth with a redux STORE.
 * 
 * We will do redux with a component after we understand vanilla react.
 * 
 * It's almost bound to come up in any conversation about a react app so do a lil research.
 * One of the most helpful articles you can read is this, is by the author of redux: 
 * https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
 * 
 * Here are the redux docs:
 * https://redux.js.org/introduction/getting-started
 * 
 * Here are the redux FAQs:
 * https://redux.js.org/faq/general
 * 
 * You don't need it for this app, but it's almost certain to come up in conversation in any react job.
 * There are other state management tools however, this is the most referenced on job adverts.
 */

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  confirm: false,
  entryEditing: '',
  editVariation: '',
  apiResource: {},
  data: [],
}

function unitTableReducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };
    case 'FETCH_DATA_SUCCESS':
      const { data } = action.response;

      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        data,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'Test to simulate errors here to find out what action res to set this to'
      } 
    case 'DELETE_ENTRY_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'DELETE_ENTRY_SUCCESS':
      console.log(action)

      const delet = JSON.parse(action.response.config.data);
      const testing = delet.id
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.data.filter(entry => testing !== entry.id)
      }
    case 'DELETE_ENTRY_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case 'CREATE_ENTRY_REQUEST': 
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'CREATE_ENTRY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...state.data, action.response.data]
      }
    case 'CREATE_ENTRY_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    
    default:
      return state;
  }
}

export default function BasicTable() {
  const mounted = useRef(false);
  const [state, dispatch] = useReducer(unitTableReducer, initialState);

  // Fetch data, this is the functional equivalent to componentDidMount.
  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true;

      const fetchData = async () => {
        dispatch({type: 'FETCH_DATA_REQUEST'});

        await makeRequest('GET')
          .then((response) => {
            dispatch({type: 'FETCH_DATA_SUCCESS', response});
          })
          .catch((err) => {
            dispatch({type: 'FETCH_DATA_FAILURE', err});
          });
      };
  
      fetchData();
    }
  }, []);

  const deleteEntry = async (id = '', resource = {}) => {
    if (!id) {
      return;
    }

    dispatch({type: 'DELETE_ENTRY_REQUEST'});
   
    await makeRequest('DELETE', id, resource)
      .then(response => {
        // Do more logic here for more response code
        if (response.status === 204) {
          dispatch({type: 'DELETE_ENTRY_SUCCESS', response});
        }
      })
      .catch(err => {
        dispatch({type: 'DELETE_ENTRY_FAILURE', err});
      })
  };

  const createEntry = async (name) => {
    if (!name) {
      return;
    }

    const resource = { id: 0, name };

    dispatch({type: 'CREATE_ENTRY_REQUEST'});
   
    await makeRequest('POST', '', resource)
      .then(response => {
          dispatch({type: 'CREATE_ENTRY_SUCCESS', response});
      })
      .catch(err => {
        dispatch({type: 'CREATE_ENTRY_FAILURE', err});
      })  
  }

  const updateEntry = (id, resource) => {
    makeRequest('PUT', id, resource);
  }

  return (
    <>
      <Table 
        data={state.data}
        createEntry={createEntry}
        updateEntry={updateEntry}
        loading={state.isLoading}
        deleteEntry={deleteEntry}
        error={state.error}
        confirmBeforeEdit
        edit
        remove
        add
      />
    </>
  );
}
