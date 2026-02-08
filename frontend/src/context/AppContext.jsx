import axios from 'axios'
import '../axios'
import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducers";
const initialState = {
    userData: '',

}
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // register
    const register = async ({ companyName, name, email, phone, password, confirmPassword }) => {
        try {
            const { data } = await axios.post
                (`/auth/signup`,
                    {
                        companyName: companyName, name: name, email: email, phone: phone, password: password, confirmPassword: confirmPassword
                    })
            // dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user.name })
            // localStorage.setItem(
            //     'user',
            //     JSON.stringify({ name: data.user.name, token: data.token })
            // )
        } catch (error) {
            dispatch({ type: 'REGISTER_USER_ERROR' })
        }
    }
    // login
    const login = async ({ loginId, password }) => {
        try {
            const { data } = await axios.post(`/auth/login`,
                {
                    loginId: loginId, password: password
                })
            console.log("the data which we got from backend login is", data);
            dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.userInfo })
            localStorage.setItem(
                'user',
                JSON.stringify({ name: data.userInfo.username, token: data.token, role: data.userInfo.role })
            )

        } catch (error) {
            dispatch({ type: 'REGISTER_USER_ERROR' })
        }
    }
    // logout
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT_USER' })
    }
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const newUser = JSON.parse(user)
            console.log("the new User data is", newUser)
            dispatch({ type: 'SET_USER', payload: { username: newUser.name, role: newUser.role } })
        }
    }, [])

    return (
        <AppContext.Provider
            value={
                {
                    ...state,
                    register,
                    login,
                    logout
                }
            }
        >
            {children}
        </AppContext.Provider >
    )
}
const useGlobalContext = () => {
    return useContext(AppContext)
}
export { useGlobalContext, AppContextProvider }
