import {useCallback, useEffect, useState} from "react";
import API from "../api";
import {User} from "../model/models";

export type AuthState = {
    currentUser: User | null,
    token: string | null,
    isAuthenticated: boolean;
}

export const useProvideAuth = () => {

    const [authState, setAuthState] = useState<AuthState>({isAuthenticated: false, token: null, currentUser: null});

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            getCurrent()
                .then(resp => {
                    setCurrentUser(resp.data, token);
                })
                .catch(() => logout());
        }
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        try {
            const resp = await sendLoginRequest(username, password);
            const {token} = resp.data;
            if (!token) throw new Error('Token is not provided');

            localStorage.setItem('jwtToken', token);
            setCurrentUser(resp.data, token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }, []);

    const registration = useCallback(async (username: string, password: string) => {
        try {
            const resp = await sendRegisterRequest(username, password);
            const {token} = resp.data;
            if (!token) throw new Error('Token is not provided');

            localStorage.setItem('jwtToken', token);
            setCurrentUser(resp.data, token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('jwtToken');
        setAuthState({isAuthenticated: false, currentUser: null, token: null});
    }, []);


    const sendLoginRequest = async (username: string, password: string) => {
        return await API.post<User>('/auth/login', {
            username,
            password,
        });
    }

    const sendRegisterRequest = async (username: string, password: string) => {
        return await API.post<User>('/auth/register', {
            username,
            password,
        });
    }

    const getCurrent = async () => {
        return await API.get<User>('/auth/user');
    }

    const setCurrentUser = (user: User, token: string) => {
        setAuthState({
            isAuthenticated: true,
            currentUser: user,
            token: token,
        });
    }

    return {authState, login, logout, registration};

}