import {
  EDIT_ENTRY,
  REMOVE_ENTRY,
  GET_DATA,
  GET_DATA_ERROR,
  UPDATE_ENTRIES
} from './table.types';
import axios from 'axios';

export const getData = () => async dispatch => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    dispatch({
      type: GET_DATA,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: GET_DATA_ERROR,
      payload: console.log(e)
    });
  }
};

export const editItem = data => async dispatch => {
  let item = data[0];
  item.address.city = data[1];
  item.address.zipcode = data[2];
  try {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${data[0].id}`,
      item
    );
    dispatch({
      type: EDIT_ENTRY,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: EDIT_ENTRY,
      payload: console.log(e)
    });
  }
};

export const deleteItem = index => dispatch => {
  dispatch({
    type: REMOVE_ENTRY,
    payload: index
  });
};

export const updateEntries = data => dispatch => {
  dispatch({
    type: UPDATE_ENTRIES,
    payload: data
  });
};
