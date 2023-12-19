import React from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {PostListsComponent} from "./components/PostListsComponent";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./components/LoginPage";
import {COLORS} from "./theme.consts";
import {CreatePostPage} from "./components/CreatePostPage";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./context/authContext";

library.add(fas);

const router = createBrowserRouter([
    {
        path: '/',
        element: <PostListsComponent></PostListsComponent>
    },
    {
        path: '/add-post',
        element: <CreatePostPage/>
    },
    {
        path: '/edit-post/:id',
        element: <CreatePostPage/>
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    }
])

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: COLORS.secondary
        },
        background: {
            default: COLORS.backgroundColor
        },
    },
});


function App() {

    return (
        <AuthProvider>
            <ThemeProvider theme={darkTheme}>
                <div>
                    <RouterProvider router={router}></RouterProvider>
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
}

const styles = {
}

export default App;
