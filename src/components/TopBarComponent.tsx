// @flow
import * as React from 'react';
import {COLORS} from "../theme.consts";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {AvatarComponent} from "./ui/AvatarComponent";
import {useAuth} from "../context/authContext";

type Props = {

};
export const TopBarComponent = (props: Props) => {

    const navigate = useNavigate();
    let {authState} = useAuth();

    const goToLoginPage = () => {
        navigate('/login');
    }

    return (
        <div style={styles.container}>
                <img
                    width={50}
                    height={50}
                    src={require('../assets/img/reddit-logo.png')}
                    style={styles.logo}
                    alt={'logo'}
                    onClick={() => navigate('/')}
                />

            <div style={{marginLeft: 'auto', marginRight: 20}}>
                {authState.isAuthenticated
                    ?
                    <div style={styles.userInfo} onClick={() => navigate('/login')}>
                        <AvatarComponent username={authState.currentUser?.username!}/>
                        <span style={{marginLeft: 10}}>{authState.currentUser?.username}</span>
                    </div>
                    :
                    <Button variant="contained" color="secondary" onClick={goToLoginPage}>
                        Login
                    </Button>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    logo: {
        marginRight: 'auto',
        marginLeft: 10,
        cursor: 'pointer'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontSize: 14,
        cursor: 'pointer'
    }
}