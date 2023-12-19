// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {TopBarComponent} from "./TopBarComponent";
import {Button, Container, TextField} from "@mui/material";
import {COLORS} from "../theme.consts";
import API from "../api";
import {useNavigate, useParams} from "react-router-dom";
import {Post} from "../model/models";

type Props = {};

type PostCreateOrUpdate = {
    title: string,
    content: string
}

const initValue: PostCreateOrUpdate = {
    title: '',
    content: ''
}

export const CreatePostPage = (props: Props) => {

    const {id} = useParams();

    let navigate = useNavigate();

    const [post, setPost] = useState<PostCreateOrUpdate>(initValue)

    useEffect(() => {
        if (id) {
            API.get<Post>(`/posts/${id}`)
                .then((response) => {
                    setPost({
                        title: response.data.title,
                        content: response.data.content
                    });
                })
                .catch((error) => console.error(error));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost({...post, [name]: value});
    };

    const submitPost = () => {
        let savePromise: Promise<any>;
        if (id) {
            savePromise = API.put(`/posts/${id}`, post);
        } else {
            savePromise = API.post('/posts', post);
        }
        savePromise
            .then(() => navigate('/'))
            .catch((error) => console.error(error));
    }

    return (
        <>
            <TopBarComponent/>
            <Container maxWidth="sm" style={styles.formContainer}>
                <form noValidate autoComplete="off">
                    <TextField
                        value={post.title}
                        onChange={handleChange}
                        name={'title'}
                        label="Title"
                        variant="outlined"
                        fullWidth
                        style={{margin: '10px 0'}}
                    />
                    <TextField
                        value={post.content}
                        onChange={handleChange}
                        name={'content'}
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        style={{margin: '10px 0'}}
                    />
                    <Button variant="contained" color="secondary" onClick={submitPost}>
                        Submit
                    </Button>
                </form>
            </Container>
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    formContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 20,
        marginTop: 20
    }
}