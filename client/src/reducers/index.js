import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import exchangeReducer from './exchangeReducer';
import myNFTReducer from './myNFTReducer';

const rootReducer = combineReducers({
    accountReducer,
    exchangeReducer,
    myNFTReducer
});

export default rootReducer;