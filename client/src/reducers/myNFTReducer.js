import { LOAD_MY_NFTS, LOG_OUT } from '../actions/index'

const initialState = {
    "nfts": []
}


const myNFTReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_NFTS:
            state.nfts = action.payload;
            return state;
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

export default myNFTReducer;