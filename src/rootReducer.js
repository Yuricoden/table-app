import { combineReducers } from 'redux';

import dataReducer from './store/table.reducer';


const rootReducer = combineReducers({
	tableData: dataReducer,
});

export default rootReducer;