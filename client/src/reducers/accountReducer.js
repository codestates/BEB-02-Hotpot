import { LOG_IN, LOG_OUT } from '../actions/index'


const initialState = {
    "account": {
        "_id": "",
        "username": "",
        "password": "",
        "date": "",
        "_v": ""
    }, "isLogin": false
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

export default accountReducer;