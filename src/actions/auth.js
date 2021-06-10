import axios from "axios";

//REGISTER

export const registerUser = (props) => {
    return async function (dispatch) {
        await axios.post("http://localhost:5000/auth/", props)
            .then(() => {
                const user = {
                    username : props.username,
                    isAuthenticated : true
                }
                dispatch({ type: "REGISTER", user });
            })
    }
}
  
//LOGIN

export const loginUser = (props) => {
    const { username, password } = props;

    return async function (dispatch) {
        await axios.post("http://localhost:5000/auth/login", { username, password })
        .then(() => {
            const user = {
                username,
                isAuthenticated : true
            }

            dispatch({ type: "LOGIN", user });
        })
    }
}

export const logoutUser = () => {
    return async function (dispatch) {
        await axios.get("http://localhost:5000/auth/logout")
        .then( res => {
            localStorage.clear();

            dispatch({ type: "LOGOUT" })
        })
    }
};