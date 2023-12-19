// @flow
import * as React from 'react';
import {useState} from 'react';
import {TopBarComponent} from "./TopBarComponent";
import {ButtonComponent} from "./ui/button/ButtonComponent";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {COLORS} from "../theme.consts";
import {useAuth} from "../context/authContext";

type Props = {};

type LoginFormData = {
    username: string,
    password: string
}

export const LoginPage = (props: Props) => {

    let navigate = useNavigate();

    const {authState, login, logout, registration} = useAuth();
    const [loginFormData, setLoginFormData] =
        useState<LoginFormData>({username: '', password: ''});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMsg(null);
        setLoginFormData({...loginFormData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        login(loginFormData.username, loginFormData.password)
            .then(() => navigate('/'))
            .catch(() => setErrorMsg('Invalid username or password'));
    }

    const logoutHandler = () => {
        logout();
    }

    const handleRegistration = () => {
        registration(loginFormData.username, loginFormData.password)
            .then(() => navigate('/'))
            .catch(() => setErrorMsg('Invalid username or password'));
    }

    return (
        <>
            <TopBarComponent/>
            <div style={styles.container}>
                {authState.isAuthenticated
                    ?
                    <div>
                        <ButtonComponent onClick={logoutHandler} text={'Logout'}/>
                    </div>
                    :
                    <Container component="main" maxWidth="xs" style={styles.loginFormContainer}>
                        <Typography component="h1" variant="h5" color={'primary'}>
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={loginFormData.username}
                                onChange={handleFormChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={loginFormData.password}
                                onChange={handleFormChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 1}}
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={handleRegistration}
                                fullWidth
                                variant="contained"
                                sx={{mt: 1, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                        </Box>
                    </Container>
                }
            </div>
        </>
    );
};

const styles = {
    container: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loginButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
    },
    loginFormContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 20,
        marginTop: 20
    }
}