import { LOAD_EXCHANGE_POSTS } from '../actions/index'

const initialState = {
    "posts": [], "curpage": 1
}


const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EXCHANGE_POSTS:
            state.posts = action.payload
            return state;
        default:
            return state;
    }
}

export default exchangeReducer;