/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) { // Colocar componentes dentro
    const [state, dispatch] = useReducer(reducer,{
        token: localStorage.getItem('authToken'),
        isAuthenticated: localStorage.getItem('authToken') ? true : false,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token) => {
            dispatch({ type: ACTIONS.LOGIN, payload: token });
            localStorage.setItem('authToken', token);
            const origin = location.state?.from?.pathname || "/"; 
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem('authToken');
        }
    };

    return (
        <AuthContext.Provider value={{state, actions}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };