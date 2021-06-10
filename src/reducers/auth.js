const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    currentUser: null
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTER":
            localStorage.setItem("token", action.user.isAuthenticated)
            return {
                ...state,
                currentUser: { username: action.user.username },
                isAuthenticated: action.user.isAuthenticated
            }
        case "LOGIN":
            localStorage.setItem("token", action.user.isAuthenticated)
            return {
                ...state,
                currentUser: { username: action.user.username },
                isAuthenticated: action.user.isAuthenticated
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                currentUser: null
            }
        default:
            return state
    }
}