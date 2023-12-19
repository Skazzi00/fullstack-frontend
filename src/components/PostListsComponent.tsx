import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Post} from "../model/models";
import PostComponent from "./PostComponent";
import {TopBarComponent} from "./TopBarComponent";
import {useNavigate} from "react-router-dom";
import {Alert, Button, CircularProgress, debounce, TextField} from "@mui/material";
import API from "../api";
import {useAuth} from "../context/authContext";

type Props = {};
export const PostListsComponent = (props: Props) => {

    let navigate = useNavigate();
    let {authState} = useAuth();

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [searchState, setSearchState] = useState<string>('');
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true);

    const addPost = () => {
        navigate('/add-post');
    }

    const searchPostsRequest = debounce((query: string) => {
        setLoadingPosts(true);
        API.get(`/posts?q=${query}`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingPosts(false));
    }, 500);

    const debouncedRequest = useCallback((value: string) => searchPostsRequest(value), []);

    useEffect(() => {
        debouncedRequest(searchState);
    }, []);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedRequest(e.target.value);
        setSearchState(e.target.value);
    };

    const onDelete = (id: number) => {
        const filtered = posts?.filter((post) => post.id !== id) || [];
        setPosts(filtered);
    }


    return (
        <>
            <TopBarComponent/>
            <div style={styles.inputContainer}>
                <TextField style={styles.input} label={"Search"} value={searchState} onChange={onInputChange}/>
            </div>
            <div style={styles.contentContainer}>
                <div></div>
                <div style={styles.postsContainer}>
                    {
                        !loadingPosts
                            ? posts?.map((post) =>
                                <div style={styles.postContainer} key={post.id}>
                                    <PostComponent post={post} onDeleteSuccess={onDelete}/>
                                </div>)
                            : <CircularProgress/>
                    }
                </div>
                <div>
                    {authState.isAuthenticated
                        ?
                        <Button variant={"contained"} color={'secondary'} style={styles.button} onClick={addPost}>
                            Add Post
                        </Button>
                        : <Alert style={{width: 'fit-content'}} severity="info">{'You need to login for adding new posts'}</Alert>}
                </div>
            </div>
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    contentContainer: {
        display: "grid",
        gridTemplateColumns: "1fr minmax(0, 2fr) 1fr",
        gap: 20,
    },
    postsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    postContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10,
        width: "100%",
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        marginBottom: 10,
    },
    input: {
        width: '50%',
    }
}