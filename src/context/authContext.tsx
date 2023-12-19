import {createContext, useContext} from "react";
import {AuthState, useProvideAuth} from "../hooks/auth.hook";

export type AuthContextType = {
    authState: AuthState,
    login: (username: string, password: string) => Promise<any>,
    logout: () => void,
    registration: (username: string, password: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider = ({children}: { children: any }) => {
    let auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}