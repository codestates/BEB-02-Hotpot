import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import exchangeReducer from './exchangeReducer';

const rootReducer = combineReducers({
    accountReducer,
    exchangeReducer
});

export default rootReducer;