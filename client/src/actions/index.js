// action types
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const LOAD_EXCHANGE_POSTS = "LOAD_EXCHANGE_POSTS";

// actions creator functions
export const logIn = (account) => {
    return {
        type: LOG_IN,
        payload: {
            "account": account,
            "isLogin": true
        }

    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const loadExchange = (posts) => {
    return {
        type: LOAD_EXCHANGE_POSTS,
        payload: posts
    }
}