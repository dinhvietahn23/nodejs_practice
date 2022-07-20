import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INIT_STATE = {
    // user: {
    //     _id:"62cb1691b6beabbb78df210c",
    //     username:"ahnviet11",
    //     email:"ahn1@gmail.com",
    //     profilePicture:"https://images.unsplash.com/photo-1657460898393-0f066e96c61c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    //     coverPicture:"https://images.unsplash.com/photo-1657440717903-d45e528c6f48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //     isAdmin: false,
    //     followers:[],
    //     followings:[]
    // },
    user:null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INIT_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE)
    return (
        <AuthContext.Provider
            value = {{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}