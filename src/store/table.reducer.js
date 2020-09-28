import {
  EDIT_ENTRY,
  REMOVE_ENTRY,
  GET_DATA,
  GET_DATA_ERROR,
  UPDATE_ENTRIES
} from './table.types';
import { act } from '@testing-library/react';

const INITIAL_STATE = {
  data: [],
  searchTerm: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      };

    case GET_DATA_ERROR:
      return {
        ...state,
        data: []
      };

    case UPDATE_ENTRIES:
      return {
        ...state,

        searchTerm: action.payload
      };

    case REMOVE_ENTRY:
      const _id = action.payload.id;
      let remove = state.data.filter(item => item.id !== _id);
      return {
        ...state,
        data: remove,
        filtered: remove
      };

    default:
      return state;
  }
};

export default reducer;
