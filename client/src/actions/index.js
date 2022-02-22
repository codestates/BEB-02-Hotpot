export const LOG_IN = "LOG_IN";

// actions creator functions
export const logIn = (account) => {
    return {
        type: LOG_IN,
        payload: {
            account
        }
    }
}