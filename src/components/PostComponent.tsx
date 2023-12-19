import {Post} from "../model/models";
import React from "react";
import {IconButton} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import API from "../api";
import {AvatarComponent} from "./ui/AvatarComponent";
import {useAuth} from "../context/authContext";

type Props = {
    post: Post,
    onDeleteSuccess: (id: number) => void,
}

function PostComponent(props: Props) {

    const post = props.post;

    let {authState} = useAuth();

    let navigate = useNavigate();

    const openEdit = (id: number) => () => {
        navigate(`/edit-post/${id}`);
    }

    const deletePost = (id: number) => () => {
        API.delete(`/posts/${id}`)
            .then(() => {
                props.onDeleteSuccess(id);
            })
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerAvatar}>
                    <AvatarComponent username={post.author.username}/>
                </div>
                <div>@{post.author.username}</div>
            </div>
            <div style={styles.headerText}>
                {post.title}
            </div>
            <div style={styles.content}>{post.content}</div>
            <div>
                {(authState.currentUser?.id === post.author.id || authState.currentUser?.superuser === true) &&
                    <div style={styles.footer}>
                        <IconButton color={"secondary"} onClick={openEdit(post.id)}>
                            <Edit/>
                        </IconButton>
                        <IconButton color={"secondary"} onClick={deletePost(post.id)}>
                            <Delete/>
                        </IconButton>
                    </div>
                }
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        backgroundColor: "black",
        borderRadius: 10,
        color: "white",
        padding: 10,
        width: "100%"
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
    },
    headerAvatar: {
        borderRadius: '50%',
        overflow: 'hidden',
        width: 40,
        height: 40,
        marginRight: 10,
    },
    headerText: {
        overflow: 'hidden',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        wordWrap: 'break-word'
    },
    content: {
        overflow: 'hidden',
        fontSize: 16,
        whiteSpace: 'pre-line',
        wordWrap: 'break-word'
    },
    footer: {
        height: 50,
        display: "flex",
        alignItems: "center",
    },
    voteButtons: {
        marginRight: 10,
    },
    voteCount: {
        marginRight: 10,
    }
}

export default PostComponent;